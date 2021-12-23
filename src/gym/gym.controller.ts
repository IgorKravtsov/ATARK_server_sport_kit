import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { GymService } from "./gym.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { Training } from "../training/training.entity";
import { Gym } from "./gym.entity";
import { AdminGuard } from "../user/guards/admin.guard";
import { GymCreateDto } from "./DTO/gym.create.dto";

@Controller('api/gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getAllGyms(): Promise<Gym[]> {
    return await this.gymService.getAllGyms()
  }

  @Post('/create')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe())
  async createGym(@Body() createGymDto: GymCreateDto): Promise<Gym> {
    return await this.gymService.create(createGymDto)
  }
}
