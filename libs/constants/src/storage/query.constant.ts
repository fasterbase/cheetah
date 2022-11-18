export enum Query {
  'Insert',
  'Find',
  'Remove',
}

export const QueryMapper: { [key in Query]: string } = {
  [Query.Insert]: 'Insert',
  [Query.Find]: 'Find',
  [Query.Remove]: 'Remove',
};
