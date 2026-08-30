import type { CurrentUserType } from '../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'multer';
import {
  createParseFilePipe,
  MAX_FILE_COUNT,
} from '../common/files/file-validation-factory';
import { FilesUploadService } from '../files-upload/files-upload.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../common/constants';
import { DeletePhotosDto } from './dtos/delete-photos-dto';

@Controller('units')
export class UnitsController {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly fileUploadService: FilesUploadService,
  ) {}

  @Post()
  @Serialize(UnitResponseDto)
  @UseInterceptors(FilesInterceptor('photos', MAX_FILE_COUNT.UNITS_IMAGES))
  async create(
    @Body() body: CreateUnitDto,
    @UploadedFiles(createParseFilePipe('2MB', ['png', 'jpeg', 'jpg', 'webp']))
    photos: Express.Multer.File[],
    @CurrentUser()
    currentUser: CurrentUserType,
  ) {
    body.photos = await this.fileUploadService.uploadFiles(photos);
    return this.unitsService.create(body, currentUser);
  }

  @Roles(RolesEnum.USER)
  @Post('/:id/photos')
  async deleteFiles(
    @Param('id') id: string,
    @Body() body: DeletePhotosDto,
    @CurrentUser() currentUser: CurrentUserType,
  ) {
    return this.unitsService.deleteUnitPhotos(id, currentUser, body);
  }

  @Roles(RolesEnum.USER)
  @Put('/:id/photos')
  @Serialize(UnitResponseDto)
  @UseInterceptors(FilesInterceptor('photos', MAX_FILE_COUNT.UNITS_IMAGES))
  async updateFiles(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserType,
    @UploadedFiles(createParseFilePipe('2MB', ['png', 'jpeg', 'jpg', 'webp']))
    photos: Express.Multer.File[],
  ) {
    return this.unitsService.updateUnitPhotos(id, currentUser, photos);
  }
}
