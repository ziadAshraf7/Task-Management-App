import { Module } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN, AuthServiceImp } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [{
    provide : AUTH_SERVICE_TOKEN , 
    useClass : AuthServiceImp
  }],
  controllers: [AuthController] ,
  imports : [JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtSecret'),
        signOptions: { expiresIn: '30h' },
      }),
      inject: [ConfigService],
    }) ,
    MongooseModule.forFeature([{name : User.name , schema  : UserSchema}])
  ]
})
export class AuthModule {}
