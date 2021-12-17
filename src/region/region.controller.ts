import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Region } from "./region.entity";
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./DTO/region.create.dto";
import { AuthGuard } from "../user/guards/auth.guard";
import { AuthUser } from "../user/decorators/authUser.decorator";

@Controller('api/region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}


  @Get('/')
  async getAllRegionsWithTrainers(): Promise<Region[]> {
    return await this.regionService.getAllRegionsWithTrainers()
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createRegion(
    @Body() createRegionDto: CreateRegionDto
  ): Promise<Region> {
    return await this.regionService.createRegion(createRegionDto)
  }
}
