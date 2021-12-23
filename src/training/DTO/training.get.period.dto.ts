import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class TrainingGetPeriodDto {

  @IsOptional()
  @IsString()
  periodInDays: string

  @IsOptional()
  @IsString()
  thisWeek: boolean

}