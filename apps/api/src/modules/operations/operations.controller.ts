import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OperationsService } from './operations.service';

@ApiTags('Calendar') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly svc: OperationsService) {}
  @Get() list(@Req() req: any) { return this.svc.listCalendar(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.createCalendar(req.user.tenantId, dto); }
}

@ApiTags('Onboarding') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly svc: OperationsService) {}
  @Get() list(@Req() req: any) { return this.svc.listOnboarding(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.createOnboarding(req.user.tenantId, dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.updateOnboarding(id, dto); }
}

@ApiTags('Recruiting') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('recruiting')
export class RecruitingController {
  constructor(private readonly svc: OperationsService) {}
  @Get() list(@Req() req: any) { return this.svc.listJobs(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.createJob(req.user.tenantId, dto); }
}

@ApiTags('Performance') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly svc: OperationsService) {}
  @Get() list(@Req() req: any) { return this.svc.listReviews(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.createReview(req.user.tenantId, dto); }
}

@ApiTags('Payroll') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly svc: OperationsService) {}
  @Get() list(@Req() req: any) { return this.svc.listPayroll(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.createPayroll(req.user.tenantId, dto); }
}

@ApiTags('Dashboard') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly svc: OperationsService) {}
  @Get() get(@Req() req: any) { return this.svc.dashboard(req.user.tenantId); }
}

@ApiTags('Reports') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly svc: OperationsService) {}
  @Get('summary') get(@Req() req: any) { return this.svc.dashboard(req.user.tenantId); }
}
