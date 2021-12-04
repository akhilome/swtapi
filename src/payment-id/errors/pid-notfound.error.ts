import { NotFoundException } from '@nestjs/common';

export class PaymentIdNotFoundError extends NotFoundException {
  constructor() {
    super('Payment Id not found');
  }
}
