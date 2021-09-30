import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isURL } from 'class-validator';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop({ required: true, minlength: 3 })
  name: string;

  @Prop({ required: true, validate: isURL })
  originalUrl: string;

  @Prop({ unique: true })
  shortUrl: string;

  @Prop({ default: 0, min: 0 })
  followCount: number;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
