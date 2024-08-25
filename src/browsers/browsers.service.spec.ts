import { Test, TestingModule } from '@nestjs/testing';
import { BrowsersService } from './browsers.service';

describe('BrowsersService', () => {
  let service: BrowsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowsersService],
    }).compile();

    service = module.get<BrowsersService>(BrowsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
