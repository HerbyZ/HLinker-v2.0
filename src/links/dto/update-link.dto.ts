import { IsUrl } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class UpdateLinkDto {
  name?: string;
  owner?: User;

  followCount?: number;

  @IsUrl()
  originalUrl?: string;
}
