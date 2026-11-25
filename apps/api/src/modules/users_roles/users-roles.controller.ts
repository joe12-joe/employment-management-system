import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersRolesService } from './users-roles.service';
@ApiTags('Users & Roles') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller()
export class UsersRolesController {
  constructor(private readonly svc: UsersRolesService) {}
  @Get('users') users(@Req() req: any) { return this.svc.users(req.user.tenantId); }
  @Get('roles') roles(@Req() req: any) { return this.svc.roles(req.user.tenantId); }
}
