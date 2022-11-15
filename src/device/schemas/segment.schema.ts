import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SegmentDocument = HydratedDocument<Segment>;

@Schema()
export class Segment {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}

export const SegmentSchema = SchemaFactory.createForClass(Segment);
