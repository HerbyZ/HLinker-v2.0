import { IsUrl, Min } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class FilterLinksDto {
  name?: string;
  shortUrl?: string;
  owner?: User;

  @IsUrl()
  originalUrl?: string;

  followCount?: number;
}
