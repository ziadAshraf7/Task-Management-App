import { IsString } from "class-validator";


export class TaskAssignmentDto {

    @IsString()
    assignedUserId : string
   
    @IsString()
    taskId : string

}