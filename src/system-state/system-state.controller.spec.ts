import { Test, TestingModule } from '@nestjs/testing';
import { SystemStateController } from './system-state.controller';
import { SystemStateService } from './system-state.service';

describe('SystemStateController', () => {
  let controller: SystemStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemStateController],
      providers: [SystemStateService],
    }).compile();

    controller = module.get<SystemStateController>(SystemStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
