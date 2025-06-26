import { apiType, bodyType, ListItemType } from "../types/types";
import { getHeaders, getPayload } from "./apiUtils";

const baseUrl = "https://dummyjson.com";

const callApi = async (
  path: string,
  type: apiType,
  body?: string
): Promise<unknown> => {
  let response = await fetch(`${baseUrl}/${path}`, getHeaders(apiType[type], body));
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
  return callApi(`products`, apiType.GET) as Promise<ListItemType[]>;
};

export const AddItemToList = async (body: bodyType): Promise<ListItemType> => {
  return callApi(
    `products/add`,
    apiType.POST,
    JSON.stringify(body)
  ) as Promise<ListItemType>;
};

export const deleteItemById = async (id: number): Promise<ListItemType> => {
  return callApi(`products/${id}`, apiType.DELETE) as Promise<ListItemType>;
};
