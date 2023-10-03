import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as crypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

export enum Role {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  Teacher = 'teacher',
  CommitteMember = 'committee_member',
}

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [] })
  tokens: string[];

  @Prop({})
  roles: Role[];

  appendNewAuthToken!: () => Promise<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await crypt.hash(user.password, 8);
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  delete userObject.roles;

  return userObject;
};

UserSchema.methods.appendNewAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
  user.tokens.push(token);

  await user.save();
  return token;
};
