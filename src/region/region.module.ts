import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "./region.entity";
import { User } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Region, User])],
  controllers: [RegionController],
  providers: [RegionService]
})
export class RegionModule {}
