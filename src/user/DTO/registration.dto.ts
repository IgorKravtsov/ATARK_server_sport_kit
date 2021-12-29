import { UserRoles } from "../enums/userRoles.enum";
import { IsArray, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegistrationDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  readonly role: UserRoles;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly level: string;

  @IsArray()
  @IsNotEmpty()
  readonly organizationIds: number[];

  @IsNumber()
  @IsOptional()
  readonly regionId: number;

  @IsNumber()
  @IsOptional()
  readonly trainerId: number;



}