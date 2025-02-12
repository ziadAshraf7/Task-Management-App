import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { USER_SERVICE_IMP_TOKEN, UserServiceImp } from './user.service';

@Module({
  controllers: [UserController],
  providers: [{
    provide : USER_SERVICE_IMP_TOKEN , 
    useClass : UserServiceImp
  }] ,
  imports : [MongooseModule.forFeature([{name : User.name , schema : UserSchema}])]
})
export class UserModule {}
