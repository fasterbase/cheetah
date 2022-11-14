export const ActionAccepted = {
  status: true,
};

export type Pagination<T> = {
  data: T[];
  token?: string;
  more: boolean;
};
