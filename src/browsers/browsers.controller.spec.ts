import { Test, TestingModule } from '@nestjs/testing';
import { BrowsersController } from './browsers.controller';

describe('BrowsersController', () => {
  let controller: BrowsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrowsersController],
    }).compile();

    controller = module.get<BrowsersController>(BrowsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
