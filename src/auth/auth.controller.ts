import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UserDataDto, UserDto } from './dtos/user.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { CurrentUserType } from './guard/jwt-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Serialize(UserDto)
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @Serialize(UserDto)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }

  @Public(false)
  @Get('me')
  @Serialize(UserDataDto)
  getMe(@CurrentUser() currentUser: CurrentUserType) {
    return currentUser;
  }
}
