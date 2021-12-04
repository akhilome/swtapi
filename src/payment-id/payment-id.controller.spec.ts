import { Test, TestingModule } from '@nestjs/testing';
import { PaymentIdController } from './payment-id.controller';

describe('PaymentIdController', () => {
  let controller: PaymentIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentIdController],
    }).compile();

    controller = module.get<PaymentIdController>(PaymentIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
