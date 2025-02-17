
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString, Matches, Min } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { SharedTask } from 'src/shared-task/shared-task.schema';
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
  @Matches("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/")
  password : string

  @Prop()
  @IsString()
  image : string

  @Prop({type : [{type : Types.ObjectId , ref : 'Task'}]})
  tasks : Task[]

  @Prop({default : []})
  userTasksCategories : string[]
}

 const UserSchema = SchemaFactory.createForClass(User);
 UserSchema.index({ name: 1 });

 export {UserSchema}