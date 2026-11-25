import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UsersRolesService {
  constructor(private readonly prisma: PrismaService) {}
  async users(tenantId: string) {
    const users = await this.prisma.user.findMany({ where: { tenantId }, include: { employee: true, userRoles: { include: { role: true } } }, orderBy: { createdAt: 'desc' } });
    return users.map((u) => ({ id: u.id, name: u.employee ? `${u.employee.firstName} ${u.employee.lastName}`.trim() : u.email, email: u.email, status: u.status, roles: u.userRoles.map((ur) => ur.role.name) }));
  }
  async roles(tenantId: string) {
    const roles = await this.prisma.role.findMany({ where: { OR: [{ tenantId }, { tenantId: null }] }, include: { rolePermissions: { include: { permission: true } } }, orderBy: { name: 'asc' } });
    return roles.map((r) => ({ id: r.id, name: r.name, code: r.code, permissions: r.rolePermissions.map((rp) => rp.permission.code) }));
  }
}
