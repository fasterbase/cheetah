import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommandDocument = HydratedDocument<Command>;

@Schema()
export class Command {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  parameterName: string;

  @Prop({ required: true })
  parameterValue: string;

  @Prop({ required: true, default: true })
  status: boolean;
}

export const CommandSchema = SchemaFactory.createForClass(Command);

CommandSchema.index({ name: 1, companyId: 1 }, { unique: true });
