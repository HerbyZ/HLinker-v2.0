import { IsUrl } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class CreateLinkDto {
  name: string;
  owner: User;

  @IsUrl()
  originalUrl: string;

  followCount?: number;
}
