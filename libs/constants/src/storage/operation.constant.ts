export enum Operation {
  'Equal',
  'Greater',
  'Less',
  'EqualGreater',
  'EqualLess',
  'Contain',
}

export const OperationMapper: { [key in Operation]: string } = {
  [Operation.Equal]: 'Equal To ...',
  [Operation.Greater]: 'Greater Than ...',
  [Operation.Less]: 'Less Than ...',
  [Operation.EqualGreater]: 'Greater Than Or Equal ...',
  [Operation.EqualLess]: 'Less Than Or Equal ...',
  [Operation.Contain]: 'Contain ...',
};
