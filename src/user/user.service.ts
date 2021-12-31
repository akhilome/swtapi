import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterRequestDto } from 'src/auth/dto/register.request.dto';
import { comparePassword, hashPassword } from 'src/common';
import { BoschService } from 'src/external/bosch.service';
import { EmailAlreadyExistsError } from './errors/exisiting-email.error';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private bosch: BoschService,
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

  async validateUser(email, password) {
    const user = await this.userModel.findOne({ email });

    if (!user || !comparePassword(password, user.hash)) {
      return null;
    }

    return { id: user.id, email: user.email };
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    return user
      ? {
          id: user.id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          phone_number: user.phone_number,
        }
      : null;
  }
}
