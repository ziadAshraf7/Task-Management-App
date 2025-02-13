import { Body, Controller, Get, Inject, Post, UseGuards , Request } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN } from './auth.service';
import { AuthService } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {


    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}


    @Post("/login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.logIn(loginDto)
    }

    
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}


