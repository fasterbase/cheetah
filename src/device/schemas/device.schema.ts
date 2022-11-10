import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

export class Output {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: false })
  key: string;
}
@Schema()
export class Device {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false, type: () => [Output] })
  outputs?: Output[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
