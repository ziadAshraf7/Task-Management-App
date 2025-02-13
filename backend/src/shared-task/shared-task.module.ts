import { Module } from '@nestjs/common';
import { SharedTaskService } from './shared-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedTask, SharedTaskSchema } from './shared-task.schema';

@Module({
  providers: [SharedTaskService],
  imports : [MongooseModule.forFeature([{name : SharedTask.name , schema : SharedTaskSchema}])]
})
export class SharedTaskModule {}
