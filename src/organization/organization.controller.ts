import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { Organization } from "./organization.entity";
import { AuthGuard } from "../user/guards/auth.guard";
import { OrganizationCreateDto } from "./DTO/organizationCreateDto";

@Controller('api/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  async getAll():Promise<Organization[]> {
    return await this.organizationService.getAll()
  }

  @Get('/:organizationId')
  @UseGuards(AuthGuard)
  async getOne(@Param('organizationId') orgId): Promise<Organization> {
    return await this.organizationService.getOne(orgId)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  // @UseGuards(AuthGuard)
  async create(@Body() createDto: OrganizationCreateDto): Promise<Organization> {
    return await this.organizationService.create(createDto)
  }
}
