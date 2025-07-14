import React, { useEffect, useState } from "react";
import {
  ContractorsSearchData,
  DataWithValidation,
  InsuredListDataDeduplication,
  ModalDuplicateMode,
} from "../../../shared/types";

/** Колонка с массивом значений */
export default function ArrayColumnWithValidation(data: DataWithValidation[]) {
  return (
    <div
      className="array-column"
    >
      {data.map(item => (
        <span className={item.isValid ? "array-column__item" : "array-column__item array-column__item-invalid"} title={item.value}>
          {item.value}
        </span>
      ))}
    </div>
  );
}
