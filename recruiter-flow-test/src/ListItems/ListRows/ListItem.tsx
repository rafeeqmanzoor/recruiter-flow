import React from "react";
import "./ListItem.css";
import { ListItemType } from "../../apis/ListApis";
import { ThreeDots } from "react-loader-spinner";

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
    <div className="rowContainer">
      <div className="rowBrand">{item.brand}</div>
      <button
        onClick={() => {
          deleteListItem(item.id);
        }}
        className="deleteButton"
      >
        {deletedIds?.includes(item.id) ? <ThreeDots wrapperClass='spinner'/> : "Delete"}
      </button>
    </div>
  );
};
export default ListItem;
