import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeletePhotosDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  photos: string[];
}
