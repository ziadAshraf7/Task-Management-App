import { Length, IsString, IsBoolean, IsDate } from "class-validator";
import { User } from "src/user/user.schema";

export default class CreateTaskDto {

      @Length(3 , 30)
      @IsString()
      title: string;
    
      @Length(10 , 300)
      @IsString()
      description: string;

      @IsString()
      dueDate : string
      
      @IsString()
      category : string
}