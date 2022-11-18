export enum ActionType {
  'Order' = 'order',
  'Action' = 'actiom',
  // 'Function',
  'Database' = 'database',
}

export const ActionTypeMapper: { [key in ActionType]: string } = {
  [ActionType.Order]: 'Order',
  [ActionType.Action]: 'Action',
  // [ActionList.Function]: 'Function',
  [ActionType.Database]: 'Database',
};
