import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateEmployeeStatusDto {
  @ApiProperty({ example: 'Terminated' })
  @IsString()
  status: string;
}
