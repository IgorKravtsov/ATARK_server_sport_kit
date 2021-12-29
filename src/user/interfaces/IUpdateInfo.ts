import { UserRoles } from "../enums/userRoles.enum";
import { Region } from "../../region/region.entity";
import { User } from "../user.entity";
import { Organization } from "../../organization/organization.entity";


export interface IUpdateInfo {

  // email: string
  // password: string
  // role: UserRoles
  level: string
  name: string
  surname: string
  region: Region
  // trainer: User
  organizations: Organization[]

}