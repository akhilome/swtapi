import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { Environment } from 'src/common';
import { ExternalModule } from 'src/external/external.module';
import { PaymentIdModule } from 'src/payment-id/payment-id.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(Environment.JWT_SECRET),
        signOptions: { expiresIn: config.get(Environment.JWT_EXPIRY) },
      }),
    }),
    PaymentIdModule,
    UserModule,
    ExternalModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
