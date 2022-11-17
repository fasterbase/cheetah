export enum ActionList {
  'Order',
  'Action',
  'Function',
  'Webhook',
  'Database',
}

export const ActionListMapper: { [key in ActionList]: string } = {
  [ActionList.Order]: 'Order',
  [ActionList.Action]: 'Action',
  [ActionList.Function]: 'Function',
  [ActionList.Webhook]: 'Webhook',
  [ActionList.Database]: 'Database',
};
