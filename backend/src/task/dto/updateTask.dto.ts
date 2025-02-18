import { PartialType } from "@nestjs/mapped-types";
import CreateTaskDto from "../../task-management/dto/createTask.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";



export default class UpdatedTaskDto extends PartialType(CreateTaskDto) {
    @IsBoolean()
    @IsOptional()
    completed? : boolean

    @IsString()
    taskId : string

    @IsOptional()
    @IsString()
    title : string 

    @IsOptional()
    @IsString()
    description : string

}