import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class AppSettings {
  @Prop({ min: 0, max: 25, default: 0 })
  vatRate: number;

  @Prop({ min: 0, default: 0 })
  minPrice: number;
}

export const appSettingsSchema = SchemaFactory.createForClass(AppSettings);
export type AppSettingsDocument = HydratedDocument<AppSettings>;
