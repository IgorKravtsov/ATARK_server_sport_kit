import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { Region } from "../region/region.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Region])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService]
})
export class UserModule {}
