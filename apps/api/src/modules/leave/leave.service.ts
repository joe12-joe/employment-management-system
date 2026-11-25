import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}
  list(tenantId: string) { return this.prisma.leaveRequest.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  create(tenantId: string, dto: any) { return this.prisma.leaveRequest.create({ data: { tenantId, employee: dto.employee, type: dto.type, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), status: dto.status ?? 'pending', reason: dto.reason ?? null } }); }
  update(tenantId: string, id: string, dto: any) { return this.prisma.leaveRequest.update({ where: { id }, data: { ...dto, startDate: dto.startDate ? new Date(dto.startDate) : undefined, endDate: dto.endDate ? new Date(dto.endDate) : undefined } }); }
}
