import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MODEL_NAMES } from '../../common/data-access';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  photos: string[];

  @Prop({ required: true })
  costPerDay: number;

  @Prop({ default: true })
  availability: boolean;

  @Prop({ required: true })
  roomsCount: number;

  @Prop({ required: true })
  adultsCount: number;

  @Prop({ required: true })
  kidsCount: number;

  @Prop({ default: false })
  hasInternetService: boolean;

  @Prop({ default: false })
  hasKitchen: boolean;

  @Prop({ default: false })
  hasPrivateGarage: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.COUNTRIES,
  })
  country: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.CITIES,
  })
  city: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.UNIT_CATEGORY,
  })
  unitCategory: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.USERS,
  })
  user: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const unitSchema = SchemaFactory.createForClass(Unit);
export type UnitDocument = HydratedDocument<Unit>;
