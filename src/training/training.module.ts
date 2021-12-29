import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { AuthGuard } from "../user/guards/auth.guard";
import { TrainerGuard } from "../user/guards/trainer.guard";
import { AdminGuard } from "../user/guards/admin.guard";
import { Training } from "./training.entity";
import { UserService } from "../user/user.service";
import { Organization } from "../organization/organization.entity";
import { Region } from "../region/region.entity";
import { Gym } from "../gym/gym.entity";
import { Characteristic } from "../characteristic/characteristic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Training, User, Organization, Region, Gym, Characteristic])],
  controllers: [TrainingController],
  providers: [TrainingService, UserService, AuthGuard, TrainerGuard, AdminGuard]
})
export class TrainingModule {}
