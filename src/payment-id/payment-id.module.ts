import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentIdController } from './payment-id.controller';
import { PaymentIdService } from './payment-id.service';
import { PaymentId, PaymentIdSchema } from './schemas/payment-id.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentId.name, schema: PaymentIdSchema },
    ]),
  ],
  controllers: [PaymentIdController],
  providers: [PaymentIdService],
  exports: [PaymentIdService],
})
export class PaymentIdModule {}
