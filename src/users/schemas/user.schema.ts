import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// TODO: Schema validation
@Schema()
export class User {
  @Prop({ required: true, unique: true, validate: isEmail })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: () => new Date() })
  joinDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
