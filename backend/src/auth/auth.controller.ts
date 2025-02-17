import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN } from './auth.service';
import { AuthService } from './auth.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}

    @Post("/login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.logIn(loginDto)
    }

}


