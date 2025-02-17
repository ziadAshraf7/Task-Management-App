import { Module } from '@nestjs/common';
import { SharedTaskService } from './shared-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedTask, SharedTaskSchema } from './shared-task.schema';
import { SharedTasksController } from './shared-task.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers : [SharedTasksController],
  providers: [SharedTaskService],
  imports : [JwtModule ,MongooseModule.forFeature([{name : SharedTask.name , schema : SharedTaskSchema}])]
})
export class SharedTaskModule {}
