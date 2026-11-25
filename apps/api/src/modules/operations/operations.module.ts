import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CalendarController, OnboardingController, RecruitingController, PerformanceController, PayrollController, DashboardController, ReportsController, SettingsController, ImportExportController } from './operations.controller';

@Module({
  controllers: [CalendarController, OnboardingController, RecruitingController, PerformanceController, PayrollController, DashboardController, ReportsController, SettingsController, ImportExportController],
  providers: [OperationsService],
})
export class OperationsModule {}
