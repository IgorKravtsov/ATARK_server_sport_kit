import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateRegionDto {

  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  @IsNumber()
  readonly subscriptionPrice: number

  @IsOptional()
  @IsNumber()
  readonly headTrainerId: number
}