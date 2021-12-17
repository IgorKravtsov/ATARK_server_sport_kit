import { Injectable } from '@nestjs/common';
import { Organization } from "./organization.entity";

@Injectable()
export class OrganizationService {

  async getUserOrganizations(userId: number): Promise<Organization[]> {
    const organizations = await Organization.find({relations: ['users']});
    return organizations.filter(organization => organization.users.length > 0)
  }
}
