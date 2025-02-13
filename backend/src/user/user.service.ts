import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from './user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { generateObjectId } from 'src/utills/utills';

export const USER_SERVICE_IMP_TOKEN = "UserServiceImp"

@Injectable()
export class UserServiceImp implements UserService {


  constructor(@InjectModel(User.name) private userModel : Model<User>){}
    
  
  async findByUserName(userName : string): Promise<User[]> {
        const users = await this.userModel.find({name : userName})
        return users
    }
    
   
   async getAll(): Promise<User[]> {
        const users : User[] = await this.userModel.find()
        return users
    }
   
   async create(createUserDto: CreateUserDto): Promise<User | null> {
         const isUserExists = await this.findByEmail(createUserDto.email)

        if(isUserExists) throw new ConflictException("user is already exists with email :" + createUserDto.email)
        const hashPassword = await bcrypt.hash(createUserDto.password , 10)
        const newUser =  new this.userModel({
            ...createUserDto,
            password: hashPassword, 
        })
        try{
          return  await newUser.save()
        }catch(e){
            Logger.error(e , "error while creating user")
            throw new InternalServerErrorException("error while creating user")
        }
    }

    async delete(userId: string): Promise<void> {
        const userObjectId : Types.ObjectId = generateObjectId(userId)
        const user = await this.userModel.findById(userObjectId)
        if(user == null) throw new NotFoundException("user does not exists")
        try{
            await this.userModel.findByIdAndDelete(userObjectId)
        }catch(e) {
            Logger.error(e)
            throw new NotFoundException("user does not exists")
        }
    }

    async update(userId : string , updateUserDto: UpdateUserDto): Promise<User | null> {
        const userObjectId : Types.ObjectId = generateObjectId(userId)
        const user = await this.userModel.findById(userObjectId)
        if(user == null) throw new NotFoundException("user does not exists")
        try{
            const user = await this.userModel.findByIdAndUpdate(userObjectId , updateUserDto , {new : true})
            return user
        }catch(e) {
            Logger.error(e)
            throw new NotFoundException("user does not exists")
        }
      
    }
    async findById(userId: string): Promise<User | null> {
        const userObjectId : Types.ObjectId = generateObjectId(userId)
        const user = await this.userModel.findById(userObjectId)
        return user || null
    }
   
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({email : email })
        return user 
    }
    
 
   
}
