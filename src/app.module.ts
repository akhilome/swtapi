import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Environment } from './common';
import { PaymentIdModule } from './payment-id/payment-id.module';

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
    PaymentIdModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
