import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly svc: DepartmentsService) {}

  @Get()
  list(@Req() req: any) { return this.svc.list(req.user.tenantId); }

  @Post()
  create(@Req() req: any, @Body() dto: CreateDepartmentDto) { return this.svc.create(req.user.tenantId, dto); }
}
