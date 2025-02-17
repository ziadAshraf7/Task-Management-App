import { LoginDto } from "./dto/login.dto";
import { LogingUserDto } from "./dto/logingUser.dto";



export interface AuthService {
    logIn(loginDto : LoginDto) : Promise<LogingUserDto  |undefined>
}