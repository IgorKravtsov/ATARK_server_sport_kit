import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegistrationDto } from "./DTO/registration.dto";
import { IRegistrationResponse } from "./types/registrationResponse.interface";
import { LoginDto } from "./DTO/login.dto";
import { AuthUser } from "./decorators/authUser.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('trainers')
  async getTrainers() {
    return await this.userService.getTrainers()
  }

  @Get('trainers/:regionId')
  async getTrainersByRegionId(@Param() param) {
    const {regionId} = param
    return await this.userService.getTrainersByRegionId(regionId)
  }

  @Post('registration')
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
    @Body() updateUserDto: RegistrationDto): Promise<IRegistrationResponse> {
    const user = await this.userService.updateUser(currentUserId, updateUserDto)
    return this.userService.buildRegistrationResponse(user)
  }

}
