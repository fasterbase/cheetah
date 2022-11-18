export enum ActionList {
  'Order' = 'order',
  'Action' = 'actiom',
  // 'Function',
  'Database' = 'database',
}

export const ActionListMapper: { [key in ActionList]: string } = {
  [ActionList.Order]: 'Order',
  [ActionList.Action]: 'Action',
  // [ActionList.Function]: 'Function',
  [ActionList.Database]: 'Database',
};
