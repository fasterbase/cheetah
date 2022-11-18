export enum Operation {
  'Equal' = 'e',
  'Greater' = 'g',
  'Less' = 'l',
  'EqualGreater' = 'eg',
  'EqualLess' = 'el',
  'DiffGreater' = 'dg',
  'DiffLess' = 'dl',
  'Custom' = 'c',
}

export const OperationMapper: { [key in Operation]: string } = {
  [Operation.Equal]: 'Equal To ...',
  [Operation.Greater]: 'Greater Than ...',
  [Operation.Less]: 'Less Than ...',
  [Operation.EqualGreater]: 'Greater Than Or Equal ...',
  [Operation.EqualLess]: 'Less Than Or Equal ...',
  [Operation.DiffGreater]: 'Difference Greater Than ...',
  [Operation.DiffLess]: 'Difference Less Than ...',
  [Operation.Custom]: 'Custom From Input ...',
};
