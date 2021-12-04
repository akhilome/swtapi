import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { MaxPaymentIdsError } from './errors/max-pids.error';
import { PaymentId } from './schemas/payment-id.schema';

@Injectable()
export class PaymentIdService {
  constructor(
    @InjectModel(PaymentId.name)
    private readonly paymentIdModel: Model<PaymentId>,
  ) {}

  async create(userId: string, isDefault = false) {
    const existingPids = await this.paymentIdModel.find({
      user_id: userId,
    });

    if (existingPids && existingPids.length >= 5) {
      throw new MaxPaymentIdsError();
    }

    const paymentId = await this.paymentIdModel.create({
      user_id: userId,
      ref: nanoid(7),
      is_default: isDefault,
    });

    return { ref: paymentId.ref, default: paymentId.is_default };
  }
}
