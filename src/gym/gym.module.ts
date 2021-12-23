import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gym } from "./gym.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Gym])],
  controllers: [GymController],
  providers: [GymService],
  exports: [GymService]
})
export class GymModule {}
