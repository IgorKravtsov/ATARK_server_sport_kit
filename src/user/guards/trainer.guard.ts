import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExpressRequestInterface } from "../../types/expressRequest.interface";
import { UserRoles } from "../enums/userRoles.enum";


@Injectable()
export class TrainerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequestInterface>()

    if(request.user) {

      if(request.user.role === UserRoles.TRAINER || request.user.role === UserRoles.ADMIN) {
        return true;
      }

      else if(request.user.role !== UserRoles.TRAINER && request.user.role !== UserRoles.ADMIN) {
        throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
      }

    }


    throw new HttpException('Не авторизованный', HttpStatus.UNAUTHORIZED);
  }
}