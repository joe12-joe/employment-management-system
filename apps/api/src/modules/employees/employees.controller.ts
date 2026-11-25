import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeStatusDto } from './dto/update-employee-status.dto';

@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly svc: EmployeesService) {}

  @Get()
  list(@Req() req: any) { return this.svc.list(req.user.tenantId); }

  @Post()
  create(@Req() req: any, @Body() dto: CreateEmployeeDto) { return this.svc.create(req.user.tenantId, dto); }

  @Get(':id')
  get(@Req() req: any, @Param('id') id: string) { return this.svc.get(req.user.tenantId, id); }

  @Patch(':id/status')
  updateStatus(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateEmployeeStatusDto) {
    return this.svc.updateStatus(req.user.tenantId, id, dto.status);
  }
}
