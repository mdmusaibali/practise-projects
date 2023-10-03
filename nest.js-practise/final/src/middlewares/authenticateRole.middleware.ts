import { UnauthorizedException } from '@nestjs/common';
import { INext, IRequest, IResponse } from 'src/interfaces/auth.interface';
import { Role } from 'src/user/user.schema';

type RoleArray = Role[];

const authenticateRole =
  (roleArray: RoleArray) =>
  async (req: IRequest, res: IResponse, next: INext) => {
    const userRoles = req.user?.roles;
    let allow = false;

    roleArray.forEach((role) => {
      if (userRoles.includes(role)) {
        allow = true;
      }
    });

    if (allow) {
      next();
    } else {
      throw new UnauthorizedException();
    }
  };

export default authenticateRole;
