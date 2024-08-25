import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrowsersModule } from './browsers/browsers.module';
import { ConnectionsModule } from './connections/connections.module';

@Module({
  imports: [BrowsersModule, ConnectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
