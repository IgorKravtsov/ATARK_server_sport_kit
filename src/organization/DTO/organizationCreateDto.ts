import { IsNotEmpty, IsString } from "class-validator";

export class OrganizationCreateDto {

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}