import { UserRoles } from "../types/userRoles.enum";

export interface ITokenInformation {
  id: number;
  role: UserRoles;
}