import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';

@ApiTags('Tasks') @ApiBearerAuth() @UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly svc: TasksService) {}
  @Get() list(@Req() req: any) { return this.svc.list(req.user.tenantId); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.svc.create(req.user.tenantId, dto); }
  @Patch(':id') update(@Req() req: any, @Param('id') id: string, @Body() dto: any) { return this.svc.update(req.user.tenantId, id, dto); }
}
