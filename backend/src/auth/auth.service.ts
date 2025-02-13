import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';


export const AUTH_SERVICE_TOKEN = "AuthServiceImp"
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceImp implements AuthService {
    
    constructor(@InjectModel(User.name) private readonly userModel : Model<User> ,
    private jwtService: JwtService
){}

    async logIn(loginDto : LoginDto): Promise<any> {
        
        const userEmail = loginDto.email
        const user = await this.userModel.findOne({email : userEmail}).select("_id email name password")
        
        if(user == null) throw new NotFoundException("user does not exists")

        const loginPassword = loginDto.password
        
        const userPassword = user.password

        const isPasswrodsMatched = await bcrypt.compare(loginPassword , userPassword)

        if(isPasswrodsMatched){
            console.log(user.name , user.email)
            const access_token =  await this.jwtService.signAsync({userId : user._id , userName : user.name , email : user.email})
            return access_token
        }
        

    }
}
