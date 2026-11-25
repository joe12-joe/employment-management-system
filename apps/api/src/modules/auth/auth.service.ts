import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { createHash, randomUUID } from 'crypto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

type JwtPayload = { sub: string; tid: string; email: string };

const DEFAULT_PERMISSIONS = [
  'employees.read','employees.create','employees.update','employees.manage_status',
  'departments.read','departments.create','departments.update',
  'users.read','roles.read','audit.read',
];

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findFirst({ where: { email } });
    if (existing) throw new BadRequestException('An account with this email already exists.');

    const tenant = await this.prisma.tenant.create({
      data: {
        name: dto.companyName.trim(),
        slug: dto.companyName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + randomUUID().slice(0, 8),
      },
    });

    const role = await this.prisma.role.create({
      data: { tenantId: tenant.id, name: 'Tenant Admin', code: 'TENANT_ADMIN', isSystem: true },
    });

    for (const code of DEFAULT_PERMISSIONS) {
      const perm = await this.prisma.permission.upsert({
        where: { code },
        update: {},
        create: { code, description: code },
      });
      await this.prisma.rolePermission.create({ data: { roleId: role.id, permissionId: perm.id } });
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        tenantId: tenant.id,
        email,
        passwordHash,
        status: 'active',
      },
    });

    await this.prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });

    // Create employee profile for the user
    const [firstName, ...rest] = dto.name.trim().split(/\s+/);
    const lastName = rest.join(' ') || 'Admin';
    const employee = await this.prisma.employee.create({
      data: {
        tenantId: tenant.id,
        employeeNumber: `EMP-${Date.now().toString().slice(-6)}`,
        firstName,
        lastName,
        workEmail: email,
        status: 'active',
        hireDate: new Date(),
      },
    });
    await this.prisma.user.update({ where: { id: user.id }, data: { employeeId: employee.id } });

    const tokens = await this.issueTokens({ sub: user.id, tid: tenant.id, email: user.email });
    return { user: await this.getMe(user.id), ...tokens };
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid email or password.');
    const ok = await argon2.verify(user.passwordHash, dto.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password.');

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    const tokens = await this.issueTokens({ sub: user.id, tid: user.tenantId, email: user.email });
    return { user: await this.getMe(user.id), ...tokens };
  }

  async refresh(refreshToken: string) {
    const payload = await this.verifyRefresh(refreshToken);
    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
    const tokens = await this.issueTokens({ sub: payload.sub, tid: payload.tid, email: payload.email });
    return { user: await this.getMe(payload.sub), ...tokens };
  }

  async logout(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    await this.prisma.refreshToken.updateMany({ where: { tokenHash, revokedAt: null }, data: { revokedAt: new Date() } });
    return { ok: true };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: true,
        userRoles: { include: { role: { include: { rolePermissions: { include: { permission: true } } } } } },
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    const roles = user.userRoles.map((ur) => ur.role.name);
    const permissions = Array.from(new Set(user.userRoles.flatMap((ur) => ur.role.rolePermissions.map((rp) => rp.permission.code))));
    const name = user.employee ? `${user.employee.firstName} ${user.employee.lastName}`.trim() : user.email;
    return { id: user.id, email: user.email, name, roles, permissions, tenantId: user.tenantId };
  }

  private async issueTokens(payload: JwtPayload) {
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET') ?? 'dev-access-secret',
      expiresIn: (this.config.get<string>('JWT_ACCESS_TTL') ?? '15m') as any,
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'dev-refresh-secret',
      expiresIn: (this.config.get<string>('JWT_REFRESH_TTL') ?? '7d') as any,
    });
    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.prisma.refreshToken.create({ data: { userId: payload.sub, tokenHash, expiresAt } });
    return { accessToken, refreshToken };
  }

  private async verifyRefresh(token: string): Promise<JwtPayload> {
    try {
      return await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'dev-refresh-secret',
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email.trim().toLowerCase() } });
    if (!user) throw new BadRequestException('No account found for that email.');
    const passwordHash = await argon2.hash(newPassword);
    await this.prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    await this.prisma.refreshToken.updateMany({ where: { userId: user.id, revokedAt: null }, data: { revokedAt: new Date() } });
    return { ok: true };
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
