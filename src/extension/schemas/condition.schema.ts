import { Compare, Operation, Segment } from '@cheetah/constants/device';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConditionDocument = HydratedDocument<Condition>;

@Schema()
export class Condition {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: Segment, required: true })
  segment: Segment;

  @Prop({ required: true, type: String, enum: Operation })
  operation: Operation;

  @Prop({ required: true, type: Number })
  threshold: number;

  @Prop({ required: true, type: String, enum: Compare })
  compare: Compare;

  @Prop({ required: true, type: Boolean, default: true })
  status: boolean;

  @Prop({ required: false, type: Number })
  customPeriod?: number;

  @Prop({ required: false, type: Number })
  customValue?: number;

  @Prop({ required: false, type: Number })
  customUserInput?: number;

  @Prop({ required: false, type: Number })
  customOperationValue?: number;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);

ConditionSchema.index({ identifier: 1, companyId: 1 }, { unique: true });
