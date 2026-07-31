import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MODEL_NAMES } from '../../common/data-access';

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.COUNTRIES })
  // country: Country;
  country: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const citySchema = SchemaFactory.createForClass(City);
export type CityDocument = HydratedDocument<City>;
