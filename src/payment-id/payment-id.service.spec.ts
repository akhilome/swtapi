import { Test, TestingModule } from '@nestjs/testing';
import { PaymentIdService } from './payment-id.service';

describe('PaymentIdService', () => {
  let service: PaymentIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentIdService],
    }).compile();

    service = module.get<PaymentIdService>(PaymentIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
