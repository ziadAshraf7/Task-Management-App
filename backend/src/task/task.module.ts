import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TASK_SERVICE_IMP_TOKEN, TaskServiceImp } from './task.service';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TaskController],
  providers: [{
    provide: TASK_SERVICE_IMP_TOKEN, 
    useClass : TaskServiceImp
  }] ,
  imports : [ JwtModule , MongooseModule.forFeature([{name : Task.name , schema : TaskSchema}]) ,
              ]
})
export class TaskModule {}
