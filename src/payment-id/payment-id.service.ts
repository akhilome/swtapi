import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { MaxPaymentIdsError } from './errors/max-pids.error';
import { PaymentId } from './schemas/payment-id.schema';

@Injectable()
export class PaymentIdService {
  constructor(
    @InjectModel(PaymentId.name)
    private readonly paymentIdModel: Model<PaymentId>,
  ) {}

  private generateId() {
    const alpha = 'qwertyuiopasdfghjklzxcvbnm';
    const num = '0123456789';
    const nanoid = customAlphabet(`${alpha}${alpha.toUpperCase()}${num}`, 7);
    return nanoid();
  }

  async create(userId: string, isDefault = false) {
    const existingPids = await this.paymentIdModel.find({
      user_id: userId,
    });

    if (existingPids && existingPids.length >= 5) {
      throw new MaxPaymentIdsError();
    }

    const paymentId = await this.paymentIdModel.create({
      user_id: userId,
      ref: this.generateId(),
      is_default: isDefault,
    });

    return { ref: paymentId.ref, default: paymentId.is_default };
  }
}
