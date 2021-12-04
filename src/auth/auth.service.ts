import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentIdService } from 'src/payment-id/payment-id.service';
import { RegisterRequestDto } from './dto/register.request.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly paymentIdService: PaymentIdService,
  ) {}

  async register(data: RegisterRequestDto) {
    const user = await this.userService.createUser(data);

    // Implementation Note: ideally, a "user.created" event is supposed to be emitted,
    // and a consumer should pick up and create a default payment id, for simplicity
    // however, let's have it this way.
    await this.paymentIdService.create(user.id, true);

    return user;
  }

  async getLoginAccessToken(user) {
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}
