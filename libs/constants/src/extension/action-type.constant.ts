export enum ActionType {
  'Command' = 'command',
  'Market' = 'market',
  // 'Function',
  'Database' = 'database',
}

export const ActionTypeMapper: { [key in ActionType]: string } = {
  [ActionType.Command]: 'Command',
  [ActionType.Market]: 'Market',
  // [ActionList.Function]: 'Function',
  [ActionType.Database]: 'Database',
};
