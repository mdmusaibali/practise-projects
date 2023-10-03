import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import * as jwt from 'jsonwebtoken';
import { INext, IRequest, IResponse } from 'src/interfaces/auth.interface';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async use(req: IRequest, _res: IResponse, next: INext) {
    const authorization = req.header('Authorization');
    try {
      if (!authorization) {
        throw new UnauthorizedException('Authorization needed');
      }
      const userToken = authorization.replace('Bearer ', '');
      if (!userToken || !(typeof userToken === 'string')) {
        throw new UnauthorizedException('Authorization needed');
      }
      const decoded = <jwt.UserIDJwtPayload>(
        jwt.verify(userToken, process.env.JWT_SECRET)
      );
      const user = await this.model.findOne({
        _id: decoded._id,
        tokens: userToken,
      });
      if (!user) {
        throw new UnauthorizedException('Please authenticate');
      }
      req.user = user;
      req.token = userToken;
      next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        const userToken = authorization && authorization.replace('Bearer ', '');
        const user = await this.model.findOne({
          tokens: userToken,
        });
        if (!user) {
          throw new UnauthorizedException('Token expired');
        }
        const newTokensArr = user.tokens.filter((token) => token !== userToken);
        await this.model.findOneAndUpdate(
          { _id: user._id },
          {
            tokens: newTokensArr,
          },
        );
        throw new UnauthorizedException('Token expired');
      } else if (error.status === 401) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
