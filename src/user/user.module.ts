import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { Region } from '../region/region.entity';
import { Organization } from '../organization/organization.entity';
import { TrainerGuard } from './guards/trainer.guard';
import { AdminGuard } from './guards/admin.guard';
import { Characteristic } from '../characteristic/characteristic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Region, Organization, Characteristic]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard, TrainerGuard, AdminGuard],
  exports: [UserService],
})
export class UserModule {}
