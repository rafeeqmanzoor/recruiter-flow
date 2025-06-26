import { apiType } from "../types/types";

export const getPayload = (result: any) => {
  const payload = result.products || {
    id: result.id,
    title: result.title || "",
    brand: result.brand,
    description: result.description,
  };
  return payload;
};

export const getHeaders = (type: string, body?: string) => {
  return {
    method: type,
    headers: { "Content-Type": "application/json" },
    body,
  };
};
