import { Expose, Transform, Type } from 'class-transformer';
import { TokensDto } from './tokens.dto';

class UserDataDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  @Transform(({ value }: { value: string }) =>
    value
      .split(' ')
      .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
      .join(' '),
  )
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

export class UserDto {
  @Expose()
  // class transform don't know nest object, the Type make's class transform know the nested object and apply filters inside it like @Expose
  @Type(() => UserDataDto)
  user: UserDataDto;

  @Expose()
  @Type(() => TokensDto)
  tokens: TokensDto;
}
