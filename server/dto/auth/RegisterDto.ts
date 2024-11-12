import {IsEmail, IsString, IsStrongPassword, Length} from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: 'errors.auth.invalid.email' })
  email: string;

  @IsString()
  @Length(4, 32, { message: 'errors.auth.invalid.username' })
  username: string;

  @IsStrongPassword({minLength: 6, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1})
  @Length(6, 255, { message: 'errors.auth.invalid.password' })
  password: string;
}
