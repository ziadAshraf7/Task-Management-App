import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import { UserService } from './user.interface';
import { User } from './user.schema';
import { USER_SERVICE_IMP_TOKEN } from './user.service';

@Controller('users')
export class UserController {
   
    constructor(@Inject(USER_SERVICE_IMP_TOKEN) private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
        return this.userService.update(userId , updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<string> {
        await this.userService.delete(userId);
        return "Deleted Successfully"
    }

    @Get("/search")
    async searchByName(@Query("userName") userName: string) {
        return await this.userService.findByUserName(userName);
    }
}
