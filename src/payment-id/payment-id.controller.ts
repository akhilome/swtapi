import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
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
  async fetch(@Req() { user }) {
    const pids = await this.paymentIdService.fetchAll(user?.id);
    return new SuccessResponseObject(
      'Payment Ids retrieved successfully',
      pids,
    );
  }

  @Post()
  async create(@Req() { user }) {
    const createdPid = await this.paymentIdService.create(user?.id);

    return new SuccessResponseObject(
      'Payment Ids generated successfully',
      createdPid,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Req() { user }, @Param('id') id) {
    await this.paymentIdService.delete(user?.id, id);
  }
}
