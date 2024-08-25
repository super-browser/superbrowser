import { Module } from '@nestjs/common';
import { BrowsersController } from './browsers.controller';
import { BrowsersService } from './browsers.service';

@Module({
  controllers: [BrowsersController],
  providers: [BrowsersService],
  exports: [BrowsersService],
})
export class BrowsersModule {}
