import { IsNotEmpty, IsString } from "class-validator";


export class GymCreateDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly address: string

}