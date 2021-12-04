import { BadRequestException } from '@nestjs/common';

export class MaxPaymentIdsError extends BadRequestException {
  constructor() {
    super('Maximum number of payment ids already created');
  }
}
