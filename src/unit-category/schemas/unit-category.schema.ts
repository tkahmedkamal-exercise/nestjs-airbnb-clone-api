import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class UnitCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  icon?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const unitCategorySchema = SchemaFactory.createForClass(UnitCategory);
export type UnitCategoryDocument = HydratedDocument<UnitCategory>;
