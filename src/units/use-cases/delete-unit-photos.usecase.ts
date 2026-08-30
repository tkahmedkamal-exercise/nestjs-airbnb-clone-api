import { BadRequestException } from './../../common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repository/unit.repository';
import { FindOneUseCase } from './find-one.usecase';
import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { CurrentUserType } from '../../auth/guard/jwt-auth.guard';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { DeletePhotosDto } from '../dtos/delete-photos-dto';

@Injectable()
export class DeleteUnitPhotosUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly findOneUseCase: FindOneUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly fileUploadService: FilesUploadService,
  ) {}

  async execute(
    unitId: string,
    currentUser: CurrentUserType,
    body: DeletePhotosDto,
  ) {
    const unit = await this.findOneUseCase.execute({ _id: unitId });
    this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser);

    if (!body.photos.length) {
      throw new BadRequestException('No photos provided');
    }

    const filteredPhotos = body.photos.filter((photo) =>
      unit.photos.includes(photo),
    );

    await this.unitRepository.findByIdAndUpdate(
      unitId,
      {
        $pull: {
          photos: {
            $in: filteredPhotos,
          },
        },
      },
      {
        returnDocument: 'after',
      },
    );

    await this.fileUploadService.deleteFiles(body.photos);
  }
}
