import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organization } from "./organization.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
