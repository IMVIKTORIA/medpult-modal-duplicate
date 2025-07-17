import React  from "react";
import { MyItemData } from "../../../../UIKit/CustomList/CustomListTypes";

/** Колонка с массивом значений статусов контрагента */
export default function ArrayColumnStatuses(data: MyItemData<string>[]) {
  function getStatusContragentColor(info?: string) {
    switch (info) {
      case "Gold":
        return "#DBB900";
      case "Silver":
        return "#9A9A9A";
      case "Platinum":
        return "#665A44";
      default:
        return "#000000"
    }
  }

  return (
    <div
      className="array-column"
    >
      {data.map(item => (
        <span 
          className="array-column__item"
          title={item.value}
          style={{color: getStatusContragentColor(item.info)}}
        >
          {item.value}
        </span>
      ))}
    </div>
  );
}
