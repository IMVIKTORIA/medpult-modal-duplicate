import React from "react";
import { TaskListData } from "../../../shared/types";
import { MyItemData } from "../../../../UIKit/CustomList/CustomListTypes";
import Scripts from "../../../shared/utils/clientScripts";
import utils, {
  getStatusTaskIcon,
  getStatusApprovalIcon,
} from "../../../shared/utils/utils";

interface TaskDetailsProps {
  rowData: TaskListData;
  onClickRowHandler?: () => void;
  reloadData?: () => void;
  onClickNumberTask: (task: any) => void;
}

function TaskDetails({ rowData, onClickNumberTask }: TaskDetailsProps) {
  return (
    <div className="task-details">
      <div className="task-details__row">
        <div className="task-details__column">
          <span className="task-details__column__title">Номер</span>
          <span
            // onClick={() => onClickNumberTask(rowData.id.value)}
            className="task-details__column__value"
          >
            {rowData.number?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">Дата создания</span>
          <span className="task-details__column__value">
            {rowData.createdAt?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">Тип задачи</span>
          <span className="task-details__column__value">
            {rowData.type?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">Вид задачи</span>
          <span className="task-details__column__value">
            {rowData.sort?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">Статус задачи</span>
          <span className="task-details__column__value task-details__status">
            {getStatusTaskIcon(rowData.statusTask?.info)}
            {rowData.statusTask?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">
            Форма согласования
          </span>
          <span className="task-details__column__value">
            {rowData.formApproval?.value}
          </span>
        </div>

        <div className="task-details__column">
          <span className="task-details__column__title">
            Статус согласования
          </span>
          <span className="task-details__column__value task-details__status">
            {getStatusApprovalIcon(rowData.statusApproval?.info)}
            {rowData.statusApproval?.value}
          </span>
        </div>
      </div>
      <div className="task-details__column2">
        <span className="task-details__column__title">Описание задачи</span>
        <span className="task-details__column__value">
          {rowData.description?.value}
        </span>
      </div>
    </div>
  );
}

export default TaskDetails;
