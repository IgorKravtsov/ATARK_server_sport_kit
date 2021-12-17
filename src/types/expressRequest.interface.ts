import { Request } from 'express'
import { User } from "../user/user.entity";

export interface ExpressRequestInterface extends Request {
  user?: User
}