import { Module } from '@nestjs/common';
import { TASK_MANAGEMENT_SERVICE_TOKEN, TaskManagementServiceImp } from './task-management.service';
import { TaskManagementController } from './task-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/task.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [{
    provide : TASK_MANAGEMENT_SERVICE_TOKEN , 
    useClass : TaskManagementServiceImp
  }],
  controllers: [TaskManagementController],
  imports : [  JwtModule,
               MongooseModule.forFeature([{name : Task.name , schema : TaskSchema}]) ,
               MongooseModule.forFeature([{name : User.name , schema : UserSchema}]) ]
})
export class TaskManagementModule {}
