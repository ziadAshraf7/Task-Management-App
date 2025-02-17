import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsString, Length, Validate } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { TaskAssignment } from './dto/taskAssignment';
import { NotPastDate } from './validation/date.validation';
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
  @Length(10 , 300)
  @IsString()
  description: string;

  @Prop({default : false})
  @IsBoolean()
  completed : boolean

  @Prop({
    type: [TaskAssignment],
    default: [],
    validate: {
      validator: function (value: TaskAssignment[]) {
        const userIds = value.map(item => item.user.toString());
        return new Set(userIds).size === userIds.length; 
      },
      message: 'Duplicate userId in assignments array',
    },
  })
  assignments: TaskAssignment[];

  @Prop({required : true})
  @IsDate()
  @Validate(NotPastDate) 
  dueDate : Date

  @Prop({type : Types.ObjectId , ref : 'User' })
  createdUser : User  

  @Prop({required : true})
  @Length(2 , 20)
  category : string
}


export const TaskSchema = SchemaFactory.createForClass(Task);

