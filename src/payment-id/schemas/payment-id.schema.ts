import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as S } from 'mongoose';

export type PaymentIdDocument = PaymentId & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class PaymentId {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop({ default: null, type: S.Types.ObjectId })
  user_id: string; // id of payment id owner

  @Prop({ default: false, type: S.Types.Boolean })
  is_default: boolean;
}

export const PaymentIdSchema = SchemaFactory.createForClass(PaymentId);
