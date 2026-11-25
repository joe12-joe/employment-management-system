import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ApprovalsModule } from './modules/approvals/approvals.module';
import { LeaveModule } from './modules/leave/leave.module';
import { ActivityModule } from './modules/activity/activity.module';
import { AuditModule } from './modules/audit/audit.module';
import { UsersRolesModule } from './modules/users_roles/users-roles.module';
import { OperationsModule } from './modules/operations/operations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    AuthModule,
    DepartmentsModule,
    EmployeesModule,
    TasksModule,
    ApprovalsModule,
    LeaveModule,
    ActivityModule,
    AuditModule,
    UsersRolesModule,
    OperationsModule,
  ],
})
export class AppModule {}
