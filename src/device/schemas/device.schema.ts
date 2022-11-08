import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;
}

export const DeviceDocument = SchemaFactory.createForClass(Device);