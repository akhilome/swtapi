import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): Record<string, string> {
    return { message: 'Hello' };
  }
}
