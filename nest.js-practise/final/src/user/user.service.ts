import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { REQUEST } from '@nestjs/core';
import { IRequest } from 'src/interfaces/auth.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    @Inject(REQUEST) private readonly request: IRequest,
  ) {
    this.insertAdminIfNotPresent();
  }

  async insertAdminIfNotPresent() {
    try {
      const admin = await this.model.findOne({
        email: process.env.ADMIN_EMAIL,
      });
      if (!admin) {
        const newAdmin = new this.model({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          roles: [Role.Admin],
        });
        await newAdmin.save();
        console.log('Admin added');
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  async findAdminByCredentials(email: string, password: string) {
    const admin = await this.model.findOne({
      email,
    });
    if (!admin) throw new NotFoundException('No admin with this email');
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new BadRequestException('Incorrect email/password');
    return admin;
  }

  async createCommitteeMember(email: string, password: string) {
    try {
      const member = new this.model({
        email,
        password,
        roles: [Role.CommitteMember],
      });
      await member.save();
      return member;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCommitteeMembers() {
    return await this.model.find({
      roles: Role.CommitteMember,
    });
  }

  async logout() {
    const { user, token } = this.request;
    user.tokens = user.tokens.filter((token1: string) => token1 !== token);
    await user.save();
  }

  async logAllOut() {
    const { user } = this.request;
    if (user) {
      user.tokens = [];
      await user.save();
    }
  }
}
