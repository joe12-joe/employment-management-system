import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  list(tenantId: string) { return this.prisma.task.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  create(tenantId: string, dto: any) { return this.prisma.task.create({ data: { tenantId, title: dto.title, assignee: dto.assignee ?? null, status: dto.status ?? 'open', dueDate: dto.dueDate ? new Date(dto.dueDate) : null } }); }
  update(tenantId: string, id: string, dto: any) { return this.prisma.task.update({ where: { id }, data: { ...dto, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined } }); }
}
