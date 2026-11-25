import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

const STATUS_TO_DB: Record<string, string> = { 'Active': 'active', 'Onboarding': 'onboarding', 'On Leave': 'on_leave', 'Terminated': 'terminated' };
const STATUS_TO_UI: Record<string, string> = { active: 'Active', onboarding: 'Onboarding', on_leave: 'On Leave', terminated: 'Terminated', suspended: 'Terminated', draft: 'Onboarding', archived: 'Terminated' };

function toUi(e: any) {
  return {
    id: e.id,
    name: `${e.firstName} ${e.lastName}`.trim(),
    email: e.workEmail ?? '',
    department: e.department?.name ?? '',
    title: e.jobTitle ?? '',
    status: STATUS_TO_UI[e.status] ?? 'Active',
  };
}

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(tenantId: string) {
    const rows = await this.prisma.employee.findMany({ where: { tenantId }, include: { department: true }, orderBy: { createdAt: 'desc' } });
    return rows.map(toUi);
  }

  async create(tenantId: string, dto: CreateEmployeeDto) {
    const [firstName, ...rest] = dto.name.trim().split(/\s+/);
    const lastName = rest.join(' ') || '-';
    let department = await this.prisma.department.findFirst({ where: { tenantId, name: dto.department.trim() } });
    if (!department) department = await this.prisma.department.create({ data: { tenantId, name: dto.department.trim() } });
    const status = STATUS_TO_DB[dto.status ?? 'Onboarding'] ?? 'onboarding';
    const emp = await this.prisma.employee.create({
      data: {
        tenantId,
        employeeNumber: `EMP-${Date.now().toString().slice(-6)}`,
        firstName,
        lastName,
        workEmail: dto.email.trim().toLowerCase(),
        jobTitle: dto.title.trim(),
        status,
        departmentId: department.id,
        hireDate: new Date(),
      },
      include: { department: true },
    });
    return toUi(emp);
  }

  async updateStatus(tenantId: string, id: string, status: string) {
    const emp = await this.prisma.employee.findFirst({ where: { id, tenantId } });
    if (!emp) throw new NotFoundException('Employee not found');
    const dbStatus = STATUS_TO_DB[status] ?? 'active';
    const updated = await this.prisma.employee.update({ where: { id }, data: { status: dbStatus }, include: { department: true } });
    return toUi(updated);
  }

  async get(tenantId: string, id: string) {
    const emp = await this.prisma.employee.findFirst({ where: { id, tenantId }, include: { department: true } });
    if (!emp) throw new NotFoundException('Employee not found');
    return toUi(emp);
  }
}
