import { IsEmail, IsString, Matches, Min } from "class-validator";


export class CreateUserDto {
      @IsString()
      name: string;
    
      @IsEmail()
      email: string;
    
      @IsString()
      password : string
    
      @IsString()
      image : string
}