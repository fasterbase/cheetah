import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionDocument = HydratedDocument<Action>;

export class Actions {
  @Prop({ required: true })
  type: string;

  // @Prop({ required: true, enum })
  // id: string;
}

@Schema()
export class Action {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true, type: Boolean })
  isExternal: string;

  @Prop({ required: false })
  externalUrl?: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  actions: string;

  @Prop({ required: true, default: true })
  status: boolean;
}

export const ActionSchema = SchemaFactory.createForClass(Action);

ActionSchema.index({ name: 1, companyId: 1 }, { unique: true });
