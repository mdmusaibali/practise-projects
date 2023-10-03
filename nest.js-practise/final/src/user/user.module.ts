import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, User, UserSchema } from './user.schema';
import authenticateRole from 'src/middlewares/authenticateRole.middleware';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/user/admin/login', method: RequestMethod.POST })
      .forRoutes(UserController);

    consumer.apply(authenticateRole([Role.Admin])).forRoutes(
      {
        path: '/user/admin/add_committee_member',
        method: RequestMethod.POST,
      },
      {
        path: '/user/admin/get_committee_members',
        method: RequestMethod.GET,
      },
    );
  }
}
