import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActivityService } from './activity.service';
@ApiTags('Activity') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly svc: ActivityService) {}
  @Get() list(@Req() req: any) { return this.svc.list(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.create(req.user.tenantId, dto); }
}
