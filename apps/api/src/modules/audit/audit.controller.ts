import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuditService } from './audit.service';
@ApiTags('Audit') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('audit')
export class AuditController {
  constructor(private readonly svc: AuditService) {}
  @Get() list(@Req() req: any) { return this.svc.list(req.user.tenantId); }
}
