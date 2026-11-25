import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}
  // Calendar
  listCalendar(tenantId: string) { return this.prisma.calendarEvent.findMany({ where: { tenantId }, orderBy: { date: 'asc' } }); }
  createCalendar(tenantId: string, dto: any) { return this.prisma.calendarEvent.create({ data: { tenantId, title: dto.title, date: new Date(dto.date), type: dto.type ?? 'event' } }); }
  // Onboarding
  listOnboarding(tenantId: string) { return this.prisma.onboardingItem.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  createOnboarding(tenantId: string, dto: any) { return this.prisma.onboardingItem.create({ data: { tenantId, employee: dto.employee, title: dto.title, status: dto.status ?? 'pending' } }); }
  updateOnboarding(id: string, dto: any) { return this.prisma.onboardingItem.update({ where: { id }, data: dto }); }
  // Recruiting
  listJobs(tenantId: string) { return this.prisma.jobPosting.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  createJob(tenantId: string, dto: any) { return this.prisma.jobPosting.create({ data: { tenantId, title: dto.title, department: dto.department ?? null, status: dto.status ?? 'open' } }); }
  // Performance
  listReviews(tenantId: string) { return this.prisma.performanceReview.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  createReview(tenantId: string, dto: any) { return this.prisma.performanceReview.create({ data: { tenantId, employee: dto.employee, period: dto.period, status: dto.status ?? 'draft' } }); }
  // Payroll
  listPayroll(tenantId: string) { return this.prisma.payrollRun.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } }); }
  createPayroll(tenantId: string, dto: any) { return this.prisma.payrollRun.create({ data: { tenantId, period: dto.period, status: dto.status ?? 'draft', total: String(dto.total ?? '0') } }); }
  // Dashboard summary
  async dashboard(tenantId: string) {
    const [employees, departments, leave, approvals, tasks] = await Promise.all([
      this.prisma.employee.count({ where: { tenantId } }),
      this.prisma.department.count({ where: { tenantId } }),
      this.prisma.leaveRequest.count({ where: { tenantId, status: 'pending' } }),
      this.prisma.approval.count({ where: { tenantId, status: 'pending' } }),
      this.prisma.task.count({ where: { tenantId, status: { not: 'done' } } }),
    ]);
    const recentActivity = await this.prisma.activity.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 5 });
    return { employees, departments, pendingLeave: leave, pendingApprovals: approvals, openTasks: tasks, recentActivity };
  }

  async getSettings(tenantId: string) {
    const t = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    let settings: any = {};
    try { settings = JSON.parse(t?.settings || '{}'); } catch {}
    return { companyName: t?.name ?? '', ...settings };
  }

  async updateSettings(tenantId: string, dto: any) {
    const t = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    let settings: any = {};
    try { settings = JSON.parse(t?.settings || '{}'); } catch {}
    const merged = { ...settings, ...dto };
    const name = dto.companyName ?? t?.name ?? '';
    delete merged.companyName;
    await this.prisma.tenant.update({ where: { id: tenantId }, data: { name, settings: JSON.stringify(merged) } });
    return { companyName: name, ...merged };
  }

  async exportEmployees(tenantId: string) {
    const rows = await this.prisma.employee.findMany({ where: { tenantId }, include: { department: true } });
    const header = 'id,name,email,department,title,status';
    const body = rows.map((e) => [e.id, `${e.firstName} ${e.lastName}`.trim(), e.workEmail ?? '', e.department?.name ?? '', e.jobTitle ?? '', e.status].map((v) => `"${String(v).replace(/"/g,'""')}"`).join(','));
    return [header, ...body].join('\n');
  }

  async exportDepartments(tenantId: string) {
    const rows = await this.prisma.department.findMany({ where: { tenantId }, include: { _count: { select: { employees: true } } } });
    const header = 'id,name,head,employees,status';
    const body = rows.map((d) => [d.id, d.name, d.headName ?? '', String(d._count.employees), d.status].map((v) => `"${String(v).replace(/"/g,'""')}"`).join(','));
    return [header, ...body].join('\n');
  }

  async exportAudit(tenantId: string) {
    const rows = await this.prisma.auditEvent.findMany({ where: { tenantId }, orderBy: { occurredAt: 'desc' }, take: 1000 });
    const header = 'id,action,resourceType,resourceId,actorUserId,occurredAt';
    const body = rows.map((a) => [a.id, a.action, a.resourceType, a.resourceId ?? '', a.actorUserId ?? '', a.occurredAt.toISOString()].map((v) => `"${String(v).replace(/"/g,'""')}"`).join(','));
    return [header, ...body].join('\n');
  }

  async importEmployees(tenantId: string, csv: string) {
    const lines = csv.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return { imported: 0, errors: ['No data rows found'] };
    const header = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/"/g, ''));
    const idx = (n: string) => header.indexOf(n);
    const errors: string[] = [];
    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].match(/("([^"]|"")*"|[^,]*)/g)?.map((c) => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim()) ?? [];
      const name = cols[idx('name')] || '';
      const email = cols[idx('email')] || '';
      const department = cols[idx('department')] || '';
      const title = cols[idx('title')] || '';
      if (!name || !email) { errors.push(`Row ${i + 1}: name and email required`); continue; }
      const [firstName, ...rest] = name.split(/\s+/);
      const lastName = rest.join(' ') || '-';
      let dept = department ? await this.prisma.department.findFirst({ where: { tenantId, name: department } }) : null;
      if (department && !dept) dept = await this.prisma.department.create({ data: { tenantId, name: department } });
      await this.prisma.employee.create({ data: { tenantId, employeeNumber: `EMP-${Date.now().toString().slice(-6)}${i}`, firstName, lastName, workEmail: email.toLowerCase(), jobTitle: title || null, departmentId: dept?.id ?? null, status: 'active', hireDate: new Date() } });
      imported++;
    }
    return { imported, errors };
  }
}
