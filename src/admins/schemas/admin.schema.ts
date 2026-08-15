import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isSuperAdmin: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = HydratedDocument<Admin>;
