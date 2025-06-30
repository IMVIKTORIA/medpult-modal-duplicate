import React from "react";
import { RequestListData } from "../../../shared/types";

interface RequestDetailsProps {
  rowData: RequestListData;
  onClickRowHandler?: () => void;
  reloadData?: () => void;
}

function RequestDetails({ rowData }: RequestDetailsProps) {
  return (
    <div className="request-details">
      <div className="request-details__row">
        <div className="request-details__column">
          <span className="request-details__column__title">Номер</span>
          <span className="request-details__column__value">
            {rowData.number?.value}
          </span>
        </div>
        <div className="request-details__column">
          <span className="request-details__column__title">Дата создания</span>
          <span className="request-details__column__value">
            {rowData.createdAt?.value}
          </span>
        </div>
        <div className="request-details__column">
          <span className="request-details__column__title">Канал</span>
          <span className="request-details__column__value">
            {rowData.channel?.value}
          </span>
        </div>
        <div className="request-details__column">
          <span className="request-details__column__title">Тема обращения</span>
          <span className="request-details__column__value">
            {rowData.topic?.value}
          </span>
        </div>
        <div className="request-details__column">
          <span className="request-details__column__title">Статус</span>
          <span className="request-details__column__value">
            {rowData.statusRequest?.value}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;
