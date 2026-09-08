import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  expiresAt: Date;

  @Prop({ default: false })
  isVerified: boolean;
}

export const otpSchema = SchemaFactory.createForClass(Otp);
