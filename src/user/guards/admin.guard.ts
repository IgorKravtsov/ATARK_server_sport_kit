import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExpressRequestInterface } from "../../types/expressRequest.interface";
import { UserRoles } from "../enums/userRoles.enum";


@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequestInterface>()

    if(request.user) {

      if(request.user.role !== UserRoles.ADMIN) {
        throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
      }

     return true
    }


    throw new HttpException('Не авторизованный', HttpStatus.UNAUTHORIZED);
  }
}