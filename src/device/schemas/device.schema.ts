import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

export class Output {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  key: string;

  @Prop({ type: Boolean, required: true, default: true })
  active: boolean;
}
@Schema()
export class Device {
  @Prop({ required: true })
  companyId: string;

  @Prop({ unique: true, index: true, required: true })
  deviceId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false, type: () => [Output] })
  outputs?: Output[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
