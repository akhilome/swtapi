import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SuccessResponseObject } from 'src/common';
import { CustomError } from 'src/common/custom.error';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: RegisterRequestDto) {
    // throw new Error('Something happened');
    throw new CustomError('Something happened');

    const user = await this.authService.register(data);

    return new SuccessResponseObject('Registration successful', user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    const data = await this.authService.getLoginAccessToken(req.user);

    return new SuccessResponseObject('Login successful', data);
  }
}
