import { Module } from '@nestjs/common';
import { ConnectionsGateway } from './connections.gateway';
import { BrowsersModule } from 'src/browsers/browsers.module';

@Module({
  imports: [BrowsersModule],
  providers: [ConnectionsGateway],
})
export class ConnectionsModule {}
