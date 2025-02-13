import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsString, Length, Max, Min } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TaskAssignment } from './dto/taskAssignment';
import { SharedTask } from 'src/shared-task/shared-task.schema';
export type CatDocument = HydratedDocument<Task>;

@Schema({
    timestamps : true
})
export class Task {
  
  @Prop({required : true})
  @Length(3 , 30)
  @IsString()
  title: string;

  @Prop({required : true})
  @Length(50 , 300)
  @IsString()
  description: string;

  @Prop({default : false})
  @IsBoolean()
  completed : boolean

  @Prop({type : TaskAssignment , default : []})
  assignments : TaskAssignment[]

  @Prop({required : true})
  @IsDate()
  deadline : Date

  @Prop({type : Types.ObjectId , ref : 'User' })
  createdUser : User  

  @Prop({required : true})
  @Length(2 , 20)
  category : string
}

export const TaskSchema = SchemaFactory.createForClass(Task);

