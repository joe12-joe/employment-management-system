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
}
