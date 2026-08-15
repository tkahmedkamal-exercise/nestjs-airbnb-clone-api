import { SetMetadata } from '@nestjs/common';
import { Roles as RolesEnum } from '../../common/constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
