import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class ApprovalsService {
  constructor(private readonly prisma: PrismaService) {}
  list(tenantId: string) { return this.prisma.approval.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  create(tenantId: string, dto: any) { return this.prisma.approval.create({ data: { tenantId, type: dto.type, requester: dto.requester, status: dto.status ?? 'pending', details: dto.details ?? '{}' } }); }
  update(tenantId: string, id: string, dto: any) { return this.prisma.approval.update({ where: { id }, data: dto }); }
}
