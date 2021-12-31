import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoschService } from 'src/external/bosch.service';
import { ExternalModule } from 'src/external/external.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ExternalModule,
  ],
  providers: [UserService, BoschService],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
