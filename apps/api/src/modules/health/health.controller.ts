import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get('live')
  live() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('ready')
  ready() {
    // TODO: add DB/Redis connectivity checks
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
