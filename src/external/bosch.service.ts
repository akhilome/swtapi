import { Injectable } from '@nestjs/common';

@Injectable()
export class BoschService {
  sayhi() {
    console.log('hi');
  }
}
