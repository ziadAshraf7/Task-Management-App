import { Module } from '@nestjs/common';
import { TASK_MANAGEMENT_SERVICE_TOKEN, TaskManagementServiceImp } from './task-management.service';
import { TaskManagementController } from './task-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/task.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { SharedTask, SharedTaskSchema } from 'src/shared-task/shared-task.schema';
import { SharedTaskModule } from 'src/shared-task/shared-task.module';

@Module({
  providers: [{
    provide : TASK_MANAGEMENT_SERVICE_TOKEN , 
    useClass : TaskManagementServiceImp
  }],
  controllers: [TaskManagementController],
  imports : [ 
              JwtModule,
               MongooseModule.forFeature([{name : Task.name , schema : TaskSchema}]) ,
               MongooseModule.forFeature([{name : User.name , schema : UserSchema}]) ,
               MongooseModule.forFeature([{name : SharedTask.name , schema : SharedTaskSchema}]) ]
})
export class TaskManagementModule {}


