import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserService } from './user.service';
import { UserInterceptor } from './user.interceptor';
import { AddCommitteeMemberDto } from './dtos/add-committee-member.dto';

@Controller('user')
@UseInterceptors(new UserInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin/login')
  async adminLogin(@Body() { email, password }: UserLoginDto) {
    const user = await this.userService.findAdminByCredentials(email, password);
    const token = await user.appendNewAuthToken();
    return { user, token };
  }

  @Post('/admin/add_committee_member')
  addCommitteeMember(@Body() { email, password }: AddCommitteeMemberDto) {
    return this.userService.createCommitteeMember(email, password);
  }

  @Get('/admin/get_committee_members')
  async getCommitteeMembers() {
    return await this.userService.getCommitteeMembers();
  }

  @Post('/logout')
  async userLogout() {
    await this.userService.logout();
    return { message: 'Successfully logged out.' };
  }

  @Post('/logAllOut')
  async userLogAllOut() {
    this.userService.logAllOut();
    return { message: 'Logged out of all devices.' };
  }
}
