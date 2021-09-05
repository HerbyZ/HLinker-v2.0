import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// TODO: Schema validation
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: () => new Date() })
  joinDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
