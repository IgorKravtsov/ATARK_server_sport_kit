import { Module } from '@nestjs/common';
import { UserTrainingController } from './user-training.controller';
import { UserTrainingService } from './user-training.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTraining } from "./user-training.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserTraining])],
  controllers: [UserTrainingController],
  providers: [UserTrainingService]
})
export class UserTrainingModule {}
