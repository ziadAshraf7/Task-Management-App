import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TASK_SERVICE_IMP_TOKEN, TaskServiceImp } from './task.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedTaskModule } from 'src/shared-task/shared-task.module';
import { SharedTaskService } from 'src/shared-task/shared-task.service';
import { SharedTask, SharedTaskSchema } from 'src/shared-task/shared-task.schema';

@Module({
  controllers: [TaskController],
  providers: [SharedTaskService ,{
    provide: TASK_SERVICE_IMP_TOKEN, 
    useClass : TaskServiceImp
  }] ,
  imports : [ SharedTaskModule , 
              JwtModule , 
              MongooseModule.forFeature([{name : Task.name , schema : TaskSchema}]) ,
              MongooseModule.forFeature([{name : SharedTask.name , schema : SharedTaskSchema}])
              ]
})
export class TaskModule {}
