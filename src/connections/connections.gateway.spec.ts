import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsGateway } from './connections.gateway';

describe('ConnectionsGateway', () => {
  let gateway: ConnectionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionsGateway],
    }).compile();

    gateway = module.get<ConnectionsGateway>(ConnectionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
