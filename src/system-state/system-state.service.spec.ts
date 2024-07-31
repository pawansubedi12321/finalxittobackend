import { Test, TestingModule } from '@nestjs/testing';
import { SystemStateService } from './system-state.service';

describe('SystemStateService', () => {
  let service: SystemStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemStateService],
    }).compile();

    service = module.get<SystemStateService>(SystemStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
