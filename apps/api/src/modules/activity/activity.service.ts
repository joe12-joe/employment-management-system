import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}
  list(tenantId: string) { return this.prisma.activity.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 100 }); }
  create(tenantId: string, dto: any) { return this.prisma.activity.create({ data: { tenantId, actor: dto.actor, action: dto.action, entity: dto.entity } }); }
}
