import { Injectable } from '@nestjs/common';
import { CreateSystemStateDto } from './dto/create-system-state.dto';
import { UpdateSystemStateDto } from './dto/update-system-state.dto';
import { NotificationTypeService } from 'src/notification-type/notification-type.service';
import { CategoryService } from 'src/category/category.service';
import { aboutUs, privacyPolicy, termsAndCondition } from 'src/utils/costant';

@Injectable()
export class SystemStateService {
  constructor(
    private ntServices: NotificationTypeService,
    private cService: CategoryService,
  ) { }

  create(createSystemStateDto: CreateSystemStateDto) {
    return 'This action adds a new systemState';
  }

  async findAll() {
    let noticationType = await this.ntServices.findAll({active: true});
    let services = await this.cService.findAll();
    let stateVersion =process.env.SYSTEM_VERSION;
    let poweredBy =process.env.INFO;
    let data = {
      "version": stateVersion,
      "notificationType" : JSON.stringify(noticationType),
       "ofc-info" : poweredBy,
       "services": JSON.stringify(services),
       "maxItem" : process.env.MAX_ITEM,
       "timePeriod": process.env.TIME_PERIOD,
       "problemInterVal" : process.env.PROBLEM_INTERVAL,
       "termAndCOndition": termsAndCondition,
       "privacyPolicy": privacyPolicy,
       "aboutUs": aboutUs,
    };
    return JSON.stringify(data);
  }

  async getSystemVersion(){
    return {
      "version": process.env.SYSTEM_VERSION,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} systemState`;
  }

  update(id: number, updateSystemStateDto: UpdateSystemStateDto) {
    return `This action updates a #${id} systemState`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemState`;
  }
}
