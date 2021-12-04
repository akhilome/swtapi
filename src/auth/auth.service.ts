import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/common';
import { RegisterRequestDto } from './dto/register.request.dto';
import { EmailAlreadyExistsError } from './errors/exisiting-email.error';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(data: RegisterRequestDto) {
    const userExists = await this.userModel.findOne({
      email: data.email,
    });

    if (userExists) throw new EmailAlreadyExistsError();

    const user = await this.userModel.create({
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      hash: hashPassword(data.password),
    });

    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      phone_number: user.phone_number,
      email: user.email,
    };
  }
}
