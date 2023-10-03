import { IsEmail, IsStrongPassword } from 'class-validator';

export class AddCommitteeMemberDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
