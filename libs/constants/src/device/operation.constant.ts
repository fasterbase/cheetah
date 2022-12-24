export enum Operation {
  'Equal' = 'equal',
  'Greater' = 'greater',
  'Less' = 'less',
  'EqualGreater' = 'equalGreater',
  'EqualLess' = 'equalLess',
  'DiffGreater' = 'diffGreater',
  'DiffLess' = 'diffLess',
  // 'Custom' = 'custom',
}

export const OperationMapper: { [key in Operation]: string } = {
  [Operation.Equal]: 'Equal To ...',
  [Operation.Greater]: 'Greater Than ...',
  [Operation.Less]: 'Less Than ...',
  [Operation.EqualGreater]: 'Greater Than Or Equal ...',
  [Operation.EqualLess]: 'Less Than Or Equal ...',
  [Operation.DiffGreater]: 'Difference Greater Than ...',
  [Operation.DiffLess]: 'Difference Less Than ...',
  // [Operation.Custom]: 'Custom From Input ...',
};
