import { ConflictException } from '@nestjs/common';

export class DefaultPaymentIdDeleteError extends ConflictException {
  constructor() {
    super('Cannot delete default payment id');
  }
}
