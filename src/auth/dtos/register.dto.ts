import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString({
    message: 'validation.USER.NAME_MUST_BE_STRING',
  })
  @IsNotEmpty({
    message: 'validation.USER.NAME_REQUIRED',
  })
  name: string;

  @IsNotEmpty({
    message: 'validation.USER.EMAIL_REQUIRED',
  })
  @IsEmail(
    {},
    {
      message: 'validation.USER.INVALID_EMAIL',
    },
  )
  email: string;

  @IsString({
    message: 'validation.USER.PHONE_MUST_BE_STRING',
  })
  @IsNotEmpty({
    message: 'validation.USER.PHONE_REQUIRED',
  })
  phoneNumber: string;

  @IsString({
    message: 'validation.USER.PASSWORD_MUST_BE_STRING',
  })
  @IsNotEmpty({
    message: 'validation.USER.PASSWORD_REQUIRED',
  })
  password: string;
}
