import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacteristicService } from './characteristic.service';
import { CharacteristicController } from './characteristic.controller';
import { Characteristic } from "./characteristic.entity";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { Organization } from "../organization/organization.entity";
import { Region } from "../region/region.entity";
import { Training } from "../training/training.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Characteristic, User, Organization, Region, Training])],
  providers: [CharacteristicService],
  controllers: [CharacteristicController]
})
export class CharacteristicModule {}
