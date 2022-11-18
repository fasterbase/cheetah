import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkspaceDocument = HydratedDocument<Workspace>;

export class WorkSpaceData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  columns: string[];

  @Prop({ required: true, default: 100 })
  columnLimit: number;
}

@Schema()
export class Workspace {
  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true, type: () => [WorkSpaceData] })
  workspaces: WorkSpaceData[];

  @Prop({ required: true, default: 2 })
  workspaceLimit: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

WorkspaceSchema.index({ companyId: 1 }, { unique: true });
