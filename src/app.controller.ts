import { Controller, Get, Res, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<any> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }
}
