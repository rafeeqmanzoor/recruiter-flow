import React from "react";
import "./ListItem.css";
import { ThreeDots } from "react-loader-spinner";
import { ListItemType } from "../../../types/types";

type Props = {
  item: ListItemType;
  deleteListItem: (id: number) => void;
  deletedIds: number[] | undefined;
};
const ListItem: React.FC<Props> = (props: Props) => {
  const { item, deleteListItem, deletedIds } = props;

  if (!item || !item.brand) {
    return <></>;
  }
  return (
    <div className="listItemRow">
      <div className="brandName">
        <h3>{item.brand}</h3>

        <p className="description">{item.description}</p>
      </div>

      <button
        onClick={() => {
          deleteListItem(item.id);
        }}
        className="deleteButton"
      >
        {deletedIds?.includes(item.id) ? (
          <ThreeDots wrapperClass="spinner" />
        ) : (
          "Delete"
        )}
      </button>
    </div>
  );
};
export default ListItem;
