import { Injectable } from '@nestjs/common';
import { CurrentUserType } from '../../auth/guard/jwt-auth.guard';
import { ForbiddenException } from '../../common/error-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class CheckUnitAuthUseCase {
  execute(unitOwnerId: string, currentUser: CurrentUserType): void {
    if (currentUser.id.toString() !== unitOwnerId)
      throw new ForbiddenException(
        'You are not allowed. only unit owner can do that',
      );
  }
}
