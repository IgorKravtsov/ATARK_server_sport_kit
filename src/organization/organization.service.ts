import { Injectable } from '@nestjs/common';
import { Organization } from "./organization.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrganizationCreateDto } from "./DTO/organizationCreateDto";

@Injectable()
export class OrganizationService {
  constructor(@InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>) {}

  async getAll(): Promise<Organization[]> {
    return await this.organizationRepository.find({relations: ['users']})
  }

  async create(createDto: OrganizationCreateDto): Promise<Organization> {
    const organization = this.organizationRepository.create({...createDto})

    return await this.organizationRepository.save(organization)
  }

  async getOne(orgId: number): Promise<Organization> {
    return this.organizationRepository.findOne(orgId)
  }

}

