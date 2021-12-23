import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegistrationDto } from "./DTO/registration.dto";
import { IRegistrationResponse } from "./interfaces/IRegistrationResponse";
import { LoginDto } from "./DTO/login.dto";
import { AuthUser } from "./decorators/auth.user.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { Organization } from "../organization/organization.entity";
import { TrainerGuard } from "./guards/trainer.guard";
import { IOrganizationResponse } from "./interfaces/IOrganizationResponse";
import { UpdateResult } from "typeorm";

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('trainers')
  async getTrainers() {
    return await this.userService.getTrainers()
  }

  @Get('trainers/:regionId')
  async getTrainersByRegionId(@Param('regionId') regionId) {
    return await this.userService.getTrainersByRegionId(regionId)
  }

  @Get('trainer/learners')
  @UseGuards(TrainerGuard)
  async getLearnersOfTheTrainer(@AuthUser() user): Promise<User[]> {
    return await this.userService.getLearnersOfTheTrainer(user)
  }

  @Get('organizations')
  @UseGuards(AuthGuard)
  async getUserOrganizations(@AuthUser('id') userId): Promise<IOrganizationResponse[]> {
    const organizations = await this.userService.getUserOrganizations(userId)
    return organizations.map(organization => this.userService.buildOrganizationResponse(organization))
  }

  @Get('payment')
  @UseGuards(AuthGuard)
  async getPayment(@AuthUser() user): Promise<number> {
    return this.userService.getPayment(user)
  }

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async registration(@Body() registrationDto: RegistrationDto): Promise<IRegistrationResponse> {
    const user = await this.userService.registration(registrationDto)
    return this.userService.buildRegistrationResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<IRegistrationResponse> {
    const user = await this.userService.login(loginDto)
    return this.userService.buildRegistrationResponse(user);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateCurrentUser(
    @AuthUser('id') currentUserId: number,
    @Body() updateUserDto: RegistrationDto): Promise<UpdateResult> {
    return  await this.userService.updateUser(currentUserId, updateUserDto)
    // return this.userService.buildRegistrationResponse(user)
  }

  @Put('make_trainer/:learnerId')
  @UseGuards(TrainerGuard)
  async makeTrainer(@Param('learnerId') learnerId: number) {
    const updatedUser = await this.userService.makeTrainerFromLearner(learnerId)
    return this.userService.buildRegistrationResponse(updatedUser);
  }

}
