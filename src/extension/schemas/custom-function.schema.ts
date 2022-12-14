import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomFunctionDocument = HydratedDocument<CustomFunction>;

export class CustomFunctionInputs {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;
}

@Schema()
export class CustomFunction {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ required: true, type: Boolean })
  isVerified: boolean;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, type: Boolean })
  isPublic: boolean;

  @Prop({ required: false })
  url?: string;

  @Prop({ required: false, type: () => [CustomFunctionInputs] })
  inputs?: CustomFunctionInputs[];

  @Prop({ required: true, default: true })
  status: boolean;
}

export const CustomFunctionSchema =
  SchemaFactory.createForClass(CustomFunction);

CustomFunctionSchema.index({ name: 1 }, { unique: true });
