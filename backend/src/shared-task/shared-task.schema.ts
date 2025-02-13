import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Task } from "src/task/task.schema";
import { User } from "src/user/user.schema";

export type SharedTaskDocument = HydratedDocument<SharedTask>;


@Schema()
export class SharedTask {
    @Prop({type : Types.ObjectId , ref : "Task"})
    task : Task

    @Prop({type : Types.ObjectId , ref : "User"})
    sharedByUser : User
    
    @Prop({type : Types.ObjectId , ref : "User"})
    sharedWithUser : User
}

export const SharedTaskSchema = SchemaFactory.createForClass(SharedTask);
