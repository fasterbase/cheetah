export enum ActionType {
  'Order' = 'order',
  'Market' = 'market',
  // 'Function',
  'Database' = 'database',
}

export const ActionTypeMapper: { [key in ActionType]: string } = {
  [ActionType.Order]: 'Order',
  [ActionType.Market]: 'Market',
  // [ActionList.Function]: 'Function',
  [ActionType.Database]: 'Database',
};
