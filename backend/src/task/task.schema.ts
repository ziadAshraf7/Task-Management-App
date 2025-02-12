import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsString, Length, Max, Min } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
export type CatDocument = HydratedDocument<Task>;

@Schema({
    timestamps : true
})
export class Task {
  
  @Prop()
  _id : Types.ObjectId

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

  @Prop({required : true})
  @IsDate()
  deadline : Date

  @Prop({type : Types.ObjectId , ref : 'User' , required : true})
  user : User  
}

export const TaskSchema = SchemaFactory.createForClass(Task);

