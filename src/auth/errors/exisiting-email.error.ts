import { BadRequestException } from '@nestjs/common';

export class EmailAlreadyExistsError extends BadRequestException {
  constructor() {
    super('User with provided email already exists');
  }
}
