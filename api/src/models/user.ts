import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignUp {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}

export class SignIn {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
