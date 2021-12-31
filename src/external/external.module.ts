import { Module } from '@nestjs/common';
import { BoschService } from './bosch.service';
import { MaerskService } from './maersk.service';

@Module({
  providers: [BoschService, MaerskService],
  exports: [BoschService, MaerskService],
})
export class ExternalModule {}
