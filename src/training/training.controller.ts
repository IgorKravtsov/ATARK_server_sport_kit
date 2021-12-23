import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { Training } from "./training.entity";
import { AuthGuard } from "../user/guards/auth.guard";
import { AuthUser } from "../user/decorators/auth.user.decorator";
import { TrainingGetPeriodDto } from "./DTO/training.get.period.dto";
import { TrainerGuard } from "../user/guards/trainer.guard";
import { TrainingCreateDto } from "./DTO/training.create.dto";

@Controller('api/training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getAllTrainings(): Promise<Training[]> {
    return await this.trainingService.getAllTrainings()
  }

  @Get('period')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getAllTrainingsInSomePeriod(
    @AuthUser() currentUser,
    @Query() query: TrainingGetPeriodDto
  ): Promise<Training[]> {
    return await this.trainingService.getAllTrainingsInSomePeriod(currentUser, query)
  }

  @Post('create')
  @UseGuards(TrainerGuard)
  @UsePipes(new ValidationPipe())
  async createTraining(@AuthUser() trainer, @Body() createTrainingDto: TrainingCreateDto): Promise<Training> {
    return await this.trainingService.createTraining(trainer, createTrainingDto)
  }

}
