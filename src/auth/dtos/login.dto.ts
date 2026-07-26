import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
    message: 'validation.USER.PASSWORD_MUST_BE_STRING',
  })
  @IsNotEmpty({
    message: 'validation.USER.PASSWORD_REQUIRED',
  })
  password: string;
}
