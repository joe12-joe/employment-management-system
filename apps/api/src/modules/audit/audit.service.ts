import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}
  list(tenantId: string) { return this.prisma.auditEvent.findMany({ where: { tenantId }, orderBy: { occurredAt: 'desc' }, take: 200 }); }
}
