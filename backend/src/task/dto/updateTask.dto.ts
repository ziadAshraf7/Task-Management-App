import { PartialType } from "@nestjs/mapped-types";
import CreateTaskDto from "../../task-management/dto/createTask.dto";
import { IsBoolean, IsOptional } from "class-validator";



export default class UpdatedTaskDto extends PartialType(CreateTaskDto) {
    @IsBoolean()
    @IsOptional()
    completed? : boolean
}