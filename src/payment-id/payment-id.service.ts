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
    if (!userId) throw new Error('user id is required to create payment id');

    const existingPids = await this.paymentIdModel.find({
      user_id: userId,
    });

    if (existingPids && existingPids.length >= 5) {
      throw new MaxPaymentIdsError();
    }

    const paymentId = await this.paymentIdModel.create({
      user_id: userId,
      id: this.generateId(),
      is_default: isDefault,
    });

    return { id: paymentId.id, default: paymentId.is_default };
  }

  async fetchAll(userId: string) {
    const paymentIds = await this.paymentIdModel.find({
      user_id: userId,
    });

    return paymentIds.map((pid) => ({ id: pid.id, default: pid.is_default }));
  }
}
