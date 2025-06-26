import { getHeaders, getPayload } from "./apiUtils";

export type ListItemType = {
  id: number;
  title: string;
  brand: string;
};

export type FetchResponse = {
  code: number;
  payload: unknown;
};

const baseUrl = "https://dummyjson.com";

const callApi = async (
  path: string,
  type: string,
  body?: string
): Promise<unknown> => {
  let response = await fetch(`${baseUrl}/${path}`, getHeaders(type, body));
  let data;
  try {
    const result = await response.json();
    data = {
      code: response.status,
      payload: getPayload(result),
    };
  } catch {
    data = {
      code: response.status,
      payload: undefined,
    };
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data.payload;
};

export const getListApis = async (): Promise<ListItemType[]> => {
  return callApi(`products`, "GET") as Promise<ListItemType[]>;
};

export const AddItemToList = async (brand: string): Promise<ListItemType> => {
  return callApi(
    `products/add`,
    "POST",
    JSON.stringify({ brand })
  ) as Promise<ListItemType>;
};

export const deleteItemById = async (id: number): Promise<ListItemType> => {
  return callApi(`products/${id}`, "DELETE") as Promise<ListItemType>;
};
