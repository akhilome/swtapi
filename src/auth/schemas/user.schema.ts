import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number?: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string; // unique

  @Prop()
  hash: string; // bcrypt encoded password

  @Prop({
    default: false,
  })
  email_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
