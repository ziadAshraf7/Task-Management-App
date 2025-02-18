


import { IsString, IsOptional } from "class-validator";

export class TaskQueryDto {
  @IsString()
  @IsOptional() 
  title?: string;

  @IsString()
  @IsOptional() 
  category?: string;

  @IsString()
  @IsOptional() 
  dueDate?: "ASC" | "DESC";

  @IsString()
  @IsOptional() 
  completed?: "completed" | "pending";
}