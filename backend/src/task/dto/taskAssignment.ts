import { IsDate, IsMongoId } from "class-validator";
import { Types } from "mongoose";


export class TaskAssignment {
    
    @IsMongoId()
    userId : Types.ObjectId

    @IsDate()
    assignedAt : Date
}