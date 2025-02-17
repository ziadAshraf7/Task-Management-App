import { Types } from "mongoose"
import { CreateUserDto } from "./dto/createUser.dto"
import UpdateUserDto from "./dto/updateUser.dto"
import { User } from "./user.schema"
import { UserResponseDto } from "./dto/user.dto"


export interface UserService {
    create(createUserDto : CreateUserDto) : Promise<User | null>
    delete(id : string) : Promise<void>
    update(id : string , updateUserDto : UpdateUserDto) : Promise<User | null>
    findById(id : string) : Promise<User | null>
    findByEmail(email : string) : Promise<User | null>
    getAll() : Promise<User[]>
    findByUserName(userName : string) : Promise<UserResponseDto[]>
}