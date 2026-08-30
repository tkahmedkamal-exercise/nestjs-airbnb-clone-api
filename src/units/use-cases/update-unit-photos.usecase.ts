import { BadRequestException } from './../../common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repository/unit.repository';
import { FindOneUseCase } from './find-one.usecase';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { CurrentUserType } from '../../auth/guard/jwt-auth.guard';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { DeletePhotosDto } from '../dtos/delete-photos-dto';

@Injectable()
export class UpdateUnitPhotosUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly fileUploadService: FilesUploadService,
  ) {}

  async execute(
    id: string,
    currentUser: CurrentUserType,
    photos: Express.Multer.File[],
  ) {
    const unit = await this.findOneUseCase.execute({ _id: id });
    this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser);

    const updatedPhotos = await this.fileUploadService.uploadFiles(photos);

    return await this.unitRepository.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          photos: {
            $each: updatedPhotos,
          },
        },
      },
      {
        returnDocument: 'after',
      },
    );
  }
}
