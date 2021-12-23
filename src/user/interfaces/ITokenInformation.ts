import { UserRoles } from "../enums/userRoles.enum";

export interface ITokenInformation {
  id: number;
  role: UserRoles;
}