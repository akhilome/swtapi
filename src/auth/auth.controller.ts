import { Body, Controller, Post } from '@nestjs/common';
import { SuccessResponseObject } from 'src/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.request.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: RegisterRequestDto) {
    const user = await this.authService.createUser(data);

    return new SuccessResponseObject('Registration successful', user);
  }
}
