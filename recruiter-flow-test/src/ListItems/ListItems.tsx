import React, { useEffect, useState } from "react";
import {
  AddItemToList,
  deleteItemById,
  getListApis,
  ListItemType,
} from "../apis/ListApis";
import ListItem from "./ListRows";
import "./ListItems.css";
import { ThreeDots } from "react-loader-spinner";

const Listitems: React.FC = () => {
  const [listItems, setListItems] = useState<ListItemType[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const getListitems = async () => {
    setIsFetching(true);
    try {
      const responseItems = await getListApis();
      setListItems(responseItems);
    } catch (error) {
      console.error("Error fetching list items:", error);
    } finally {
      console.log("Fetch operation completed");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getListitems();
  }, []);

  const deleteListItem = async (id: number) => {
    setDeletedIds((prevIds) => [...(prevIds || []), id]);
    try {
      const response = await deleteItemById(id);
      if (response) {
        const updatedItems = listItems?.filter(
          (item) => item.id !== response.id
        );
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

  const addButton = () => {
    return (
      <button
        className="addButton"
        onClick={() => {
          addItemToTheList("This is a New Brand");
        }}
      >
        Add New Item
      </button>
    );
  };

  if (isFetching) {
    return <ThreeDots wrapperClass="loadingSpinner" />;
  }
  if (!isFetching && (!listItems || !listItems?.length)) {
    return addButton();
  }

  return (
    <div className="wrapper">
      <div className="buttonListContainer">
        {
          <>
            {addButton()}
            <div className="listItemContainer">
              {listItems?.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    deletedIds={deletedIds}
                    deleteListItem={deleteListItem}
                  />
                );
              })}
            </div>
          </>
        }
      </div>
    </div>
  );
};
export default Listitems;
