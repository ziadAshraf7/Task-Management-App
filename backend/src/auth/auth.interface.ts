import { LoginDto } from "./dto/login.dto";



export interface AuthService {
    logIn(loginDto : LoginDto) : Promise<any>
}