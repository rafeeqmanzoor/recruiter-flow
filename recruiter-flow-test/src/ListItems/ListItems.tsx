import React, { useEffect, useState } from "react";
import {
  AddItemToList,
  deleteItemById,
  getListApis,
  ListItemType,
} from "../apis/ListApis";
import ListItem from "./ListRows";
import "./ListItems.css";

const Listitems: React.FC = () => {
  const [listItems, setListItems] = useState<ListItemType[] | undefined>([]);
  const [deletedIds, setDeletedIds] = useState<number[] | undefined>([]);

  const getListitems = async () => {
    try {
      const responseItems = await getListApis();
      console.log("here we go", responseItems);
      setListItems(responseItems);
    } catch (error) {
      console.error("Error fetching list items:", error);
    } finally {
      console.log("Fetch operation completed");
    }
  };

  useEffect(() => {
    getListitems();
  }, []);

  const deleteListItem = async (id: number) => {
    setDeletedIds((prevIds) => [...(prevIds || []), id]);
    try {
      const DeletedId = await deleteItemById(id);
      if (DeletedId) {
        const updatedItems = listItems?.filter((item) => item.id !== DeletedId);
        setListItems(updatedItems);
      }
    } catch (error) {
      console.error("Error deleting list item:", error);
    } finally {
      console.log("Delete operation completed");
      setDeletedIds((prevIds) => prevIds?.filter((item) => item !== id));
    }
  };

  const addItemToTheList = async (brand: string) => {
    try {
      const newItem = await AddItemToList(brand);
      if (newItem) {
        setListItems((prevItems) => [...(prevItems || []), newItem]);
      }
    } catch (error) {
      console.error("Error adding item to the list:", error);
    } finally {
      console.log("Add operation completed");
    }
  };

  return (
    <>
      <div className="itemsListContainer">
        {!listItems?.length ? (
          <div>Loading...</div>
        ) : (
          <>
            <button
              className="addButton"
              onClick={() => {
                addItemToTheList("This is a New Brand");
              }}
            >
              Add New Item
            </button>
            {listItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  deletedIds={deletedIds}
                  deleteListItem={deleteListItem}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
export default Listitems;
