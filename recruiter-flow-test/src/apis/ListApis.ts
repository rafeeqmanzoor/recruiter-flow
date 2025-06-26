export type ListItemType = {
  id: number;
  title: string;
  brand: string;
};

export type FetchResponse = {
  code: number;
  products: ListItemType[] | undefined;
};

export const getListApis = async (): Promise<ListItemType[] | undefined> => {
  const resp = await fetch("https://dummyjson.com/products");
  let data: FetchResponse;
  try {
    const result = await resp.json();
    data = {
      code: resp.status,
      products: result.products,
    };
  } catch {
    data = {
      code: resp.status,
      products: undefined,
    };
  }

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
  return data.products;
};

export const AddItemToList = async (
  brand: string
): Promise<ListItemType | undefined> => {
  const resp = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brand }),
  });
  let data: ListItemType | undefined;
  try {
    const result = await resp.json();
    data = {
      id: result.id,
      title: "",
      brand: result.brand,
    };
  } catch {
    data = undefined;
  }

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
  return data;
};

export const deleteItemById = async (
  id: number
): Promise<number | undefined> => {
  const resp = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  let DeletedId: number | undefined;
  try {
    const result = await resp.json();
    DeletedId = result.id;
  } catch {
    DeletedId = undefined;
  }

  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
  return DeletedId;
};
