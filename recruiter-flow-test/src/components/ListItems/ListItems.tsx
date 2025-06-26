import React, { useEffect, useState } from "react";
import { AddItemToList, deleteItemById, getListApis } from "../../apis/ListApis";
import ListItem from "./ListRows";
import "./ListItems.css";
import { ThreeDots } from "react-loader-spinner";
import { ListItemType } from "../../types/types";

const Listitems: React.FC = () => {
  const [listItems, setListItems] = useState<ListItemType[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  //mocked data for adding new item to the list
  const brandName = "A New Brand";
  const brandDescription =
    "This is a brand used to create a new  react project for recruiter flow";

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

  const addItemToTheList = async (brand: string, description: string) => {
    setIsAdding(true);
    try {
      const newItem = await AddItemToList({ brand, description });
      if (newItem) {
        setListItems((prevItems) => [...(prevItems || []), newItem]);
      }
    } catch (error) {
      console.error("Error adding item to the list:", error);
    } finally {
      console.log("Add operation completed");
      setIsAdding(false);
    }
  };

  const addButton = () => {
    return (
      <button
        className="addButton"
        onClick={() => {
          addItemToTheList(brandName, brandDescription); // we can take these as input from user
        }}
      >
        {isAdding ? <ThreeDots wrapperClass="addLoadingSpinner" /> : "Add Item"}
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
          </>
        }
      </div>
    </div>
  );
};
export default Listitems;
