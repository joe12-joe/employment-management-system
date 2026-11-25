import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string) {
    return this.prisma.department.findMany({
      where: { tenantId },
      include: { _count: { select: { employees: true } } },
      orderBy: { createdAt: 'desc' },
    }).then((rows) => rows.map((d) => ({
      id: d.id, name: d.name, head: d.headName ?? '', employees: d._count.employees, status: d.status === 'active' ? 'Active' : 'Inactive',
    })));
  }

  create(tenantId: string, dto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: { tenantId, name: dto.name.trim(), headName: dto.headName?.trim() || null, code: dto.code?.trim() || null },
      include: { _count: { select: { employees: true } } },
    }).then((d) => ({ id: d.id, name: d.name, head: d.headName ?? '', employees: d._count.employees, status: 'Active' }));
  }
}
