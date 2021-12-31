import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Environment } from './common';
import { PaymentIdModule } from './payment-id/payment-id.module';
import { UserModule } from './user/user.module';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get(Environment.MONGO_URL),
      }),
    }),
    AuthModule,
    UserModule,
    PaymentIdModule,
    ExternalModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
