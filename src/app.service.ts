import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    // const userId = 1;
    // const email = 'rohit@gmail.com';
    // this.eventEmitter.emit('order.created', 'order createddddd');

    return 'api v1 working properly';
  }

  // @OnEvent('order.created')
  // showOrderCreated(payload) {
  // }
}

// class OrderCreatedEvent {
//   constructor(private readonly userId: number, public readonly email: string) {}
// }

// "seed:run": "ts-node -r tsconfig-paths/register --project ./tsconfig.json ./node_modules/typeorm-seeding/dist/cli.js seed --root src/infrastructure/configs"
