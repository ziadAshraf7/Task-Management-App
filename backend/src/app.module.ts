import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configurations from './config/configurations';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [configurations], 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.url'),
      }),
      inject: [ConfigService], 
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
