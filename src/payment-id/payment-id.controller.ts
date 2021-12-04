import { Controller, Get, Req } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { SuccessResponseObject } from 'src/common';
import { PaymentIdService } from './payment-id.service';

@Auth()
@Controller({
  version: '1',
  path: 'payment-ids',
})
export class PaymentIdController {
  constructor(private readonly paymentIdService: PaymentIdService) {}

  @Get()
  async fetch(@Req() req) {
    const pids = await this.paymentIdService.fetchAll(req.user.id);
    return new SuccessResponseObject(
      'Payment Ids retrieved successfully',
      pids,
    );
  }
}
