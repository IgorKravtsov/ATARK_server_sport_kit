import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TrainingCreateDto {

  @IsNotEmpty()
  @IsString()
  readonly trainingType: string

  @IsNotEmpty()
  @IsString()
  readonly trainingDate: Date

  @IsNotEmpty()
  @IsNumber()
  readonly gymId: number

}