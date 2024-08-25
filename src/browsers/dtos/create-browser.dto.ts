import { IsEnum } from 'class-validator';
import { BrowserType } from '../enums/browser-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrowserDto {
  @ApiProperty({
    required: true,
    description: 'Browser type',
    enum: BrowserType,
  })
  @IsEnum(BrowserType)
  browserType: BrowserType;
}
