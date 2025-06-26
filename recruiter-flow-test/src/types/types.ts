export type ListItemType = {
  id: number;
  title: string;
  brand: string;
  description?: string;
};

export type FetchResponse = {
  code: number;
  payload: unknown;
};

export type bodyType = {
  brand: string;
  description: string;
};

export enum apiType  {
    'GET',
    'DELETE',
    'POST'
}