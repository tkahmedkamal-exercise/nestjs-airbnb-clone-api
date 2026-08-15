import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from '../../common/error-handling/custom-exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../../admins/admins.service';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../use-cases/generate-tokens.usecase';
import { Roles } from '../../common/constants';
import { UserDataDto } from '../dtos/user.dto';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AdminResponseDto } from '../../admins/dtos/admin-response.dto';

export interface CurrentUserType extends UserDataDto {
  role: Roles;
}

declare module 'express' {
  interface Request {
    user?: CurrentUserType;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(accessToken);
      const currentUser = await this.getCurrentUser(decodedToken);
      request.user = currentUser;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  private async getCurrentUser(payload: JwtPayload): Promise<CurrentUserType> {
    let currentUser;

    if (payload.role === Roles.ADMIN) {
      currentUser = await this.adminsService.findOne({ _id: payload.userId });
    } else {
      currentUser = await this.usersService.findOne({ _id: payload.userId });
    }

    return {
      ...currentUser,
      role: payload.role,
    };
  }
}
