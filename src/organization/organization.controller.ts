import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { Organization } from "./organization.entity";
import { AuthGuard } from "../user/guards/auth.guard";

@Controller('api/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/user/:userId')
  @UseGuards(AuthGuard)
  async getUserOrganizations(@Param() param): Promise<Organization[]> {
    const {userId} = param
    return await this.organizationService.getUserOrganizations(userId)
  }
}
