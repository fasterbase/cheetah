export enum Query {
  'Insert' = 'insert',
  'Find' = 'find',
  'Remove' = 'remove',
}

export const QueryMapper: { [key in Query]: string } = {
  [Query.Insert]: 'Insert',
  [Query.Find]: 'Find',
  [Query.Remove]: 'Remove',
};
