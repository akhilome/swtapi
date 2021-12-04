import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/echo')
  async echo(@Query() query) {
    return query;
  }
}
