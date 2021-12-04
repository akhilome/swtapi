import { Controller } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'payment-ids',
})
export class PaymentIdController {}
