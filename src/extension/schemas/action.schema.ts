import { ActionType } from '@cheetah/constants/extension';
import { Operation, Query } from '@cheetah/constants/storage';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionDocument = HydratedDocument<Action>;

export class MarketTypeModel {
  @Prop({ required: true })
  id: string;
}

export class OrderTypeModel {
  @Prop({ required: true })
  id: string;
}

export class DatabaseTypeModel {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: Operation })
  operation: Operation;

  @Prop({ required: true, enum: Query })
  query: Query;

  @Prop({ required: true, type: Object })
  subData: any;
}

export class Actions {
  @Prop({ required: true, enum: ActionType })
  type: ActionType;

  @Prop({ required: true, type: Number })
  priority: number;

  @Prop({ required: false, type: MarketTypeModel })
  market?: MarketTypeModel;

  @Prop({ required: false, type: OrderTypeModel })
  order?: OrderTypeModel;

  @Prop({ required: false, type: DatabaseTypeModel })
  database?: DatabaseTypeModel;
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
  isExternal: boolean;
  @Prop({ required: false })
  externalUrl?: string;
  @Prop({ required: true, type: () => [Actions] })
  actions: Actions[];
  @Prop({ required: true, default: true })
  status: boolean;
}

export const ActionSchema = SchemaFactory.createForClass(Action);

ActionSchema.index({ name: 1, companyId: 1 }, { unique: true });
