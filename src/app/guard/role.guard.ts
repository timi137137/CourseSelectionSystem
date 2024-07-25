import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const userInfo = await this.userService.getUserInfo(user.username);
    return requiredRoles.some((role) => userInfo.Role >= role);
  }
}
