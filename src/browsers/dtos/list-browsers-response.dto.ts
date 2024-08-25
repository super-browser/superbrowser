import { ApiProperty } from '@nestjs/swagger';

export class ListBrowsersResponseDto {
  @ApiProperty({ description: 'Browser ID of the created browser instance' })
  browserId: string;

  @ApiProperty({ description: 'Browser instance', type: 'object' })
  browser: any;
}
