import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTypeController } from './notification-type.controller';
import { NotificationTypeService } from './notification-type.service';

describe('NotificationTypeController', () => {
  let controller: NotificationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationTypeController],
      providers: [NotificationTypeService],
    }).compile();

    controller = module.get<NotificationTypeController>(NotificationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
