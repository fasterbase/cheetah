export enum Operation {
  'Equal' = 'e',
  'Greater' = 'g',
  'Less' = 'l',
  'EqualGreater' = 'eg',
  'EqualLess' = 'el',
  'Contain' = 'c',
}

export const OperationMapper: { [key in Operation]: string } = {
  [Operation.Equal]: 'Equal To ...',
  [Operation.Greater]: 'Greater Than ...',
  [Operation.Less]: 'Less Than ...',
  [Operation.EqualGreater]: 'Greater Than Or Equal ...',
  [Operation.EqualLess]: 'Less Than Or Equal ...',
  [Operation.Contain]: 'Contain ...',
};
