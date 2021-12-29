import { Controller, Get, UseGuards } from "@nestjs/common";
import { CharacteristicService } from "./characteristic.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { AuthUser } from "../user/decorators/auth.user.decorator";
import { Characteristic } from "./characteristic.entity";
import { User } from "../user/user.entity";

@Controller('characteristic')
export class CharacteristicController {
  constructor(private readonly characteristicService: CharacteristicService) {}

  // @Get('/')
  // @UseGuards(AuthGuard)
  // async getAllTrainings(@AuthUser() user: User): Promise<Characteristic[]> {
  //   return await this.characteristicService.getAllUserCharacteristics(user)
  // }
}
