import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UserDataDto } from '../auth/dtos/user.dto';
import { CurrentUserType } from '../auth/guard/jwt-auth.guard';
import { DeletePhotosDto } from './dtos/delete-photos-dto';
import { DeleteUnitPhotosUseCase } from './use-cases/delete-unit-photos.usecase';
import { UpdateUnitPhotosUseCase } from './use-cases/update-unit-photos.usecase';

@Injectable()
export class UnitsService {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly deleteUnitPhotosUseCase: DeleteUnitPhotosUseCase,
    private readonly updateUnitPhotosUseCase: UpdateUnitPhotosUseCase,
  ) {}

  async create(body: CreateUnitDto, currentUser: CurrentUserType) {
    return await this.createUnitUseCase.execute(body, currentUser);
  }

  async deleteUnitPhotos(
    unitId: string,
    currentUser: CurrentUserType,
    body: DeletePhotosDto,
  ) {
    return await this.deleteUnitPhotosUseCase.execute(
      unitId,
      currentUser,
      body,
    );
  }

  async updateUnitPhotos(
    unitId: string,
    currentUser: CurrentUserType,
    photos: Express.Multer.File[],
  ) {
    return await this.updateUnitPhotosUseCase.execute(
      unitId,
      currentUser,
      photos,
    );
  }
}
