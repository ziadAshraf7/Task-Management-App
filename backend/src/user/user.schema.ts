
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, Matches, Min } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from 'src/task/task.schema';

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required : true})
  @IsString()
  name: string;

  @Prop({required : true , unique : true})
  @IsEmail()
  email: string;

  @Prop({required : true , default : false})
  @IsString()
  @Min(8)
  @Matches("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/")
  password : string

  @Prop()
  @IsString()
  image : string

  @Prop({type : [{type : Types.ObjectId , ref : 'Task'}]})
  tasks : Task[]
}

export const UserSchema = SchemaFactory.createForClass(User);

