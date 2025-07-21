import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ItemDataString,
  ListColumnData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes.ts";
import { ContractorsSearchData, TaskListData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import SliderPanel from "../SliderPanel/SliderPanel";
import utils, { useDebounce } from "../../shared/utils/utils";
import TaskDetails from "./TaskDetails/TaskDetails";

/** Данные поиска обращений */
export interface TaskSearchData extends ContractorsSearchData {
  /** Поисковый запрос */
  searchQuery?: string;
  /** Идентификаторы выбранных обращений */
  requestsIds?: string[];
  /** Идентификаторы выбранных застрахованных */
  insuredIds?: string[];
  /** Идентификаторы выбранных обратившихся */
  contractorsIds?: string[];
  /** Показывать закрытые задачи */
  isShowClosed?: boolean;
}

export type TaskListProps = {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[];
  /** Выбранные обращения */
  selectedRequestsIds: string[];
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
  /** Выбранные задачи */
  selectedTasksIds: string[];
  /** Установить выбранные задачи */
  setSelectedTasksIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Показывать закрытые задачи */
  sliderActive?: boolean;
  /** Изменить значение показывать закрытые задачи */
  setSliderActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Список задач */
export default function TaskList({
  selectedContractorsIds,
  selectedInsuredIds,
  selectedRequestsIds,
  contractorsSearchData,
  sliderActive,
  setSliderActive,
}: TaskListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик нажатия на номер задачи */
  const onClickNumberTask = async (task: MyItemData<string>) => {
    const taskId = task.info;
    if (!taskId) return;

    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);
    localStorage.setItem("taskId", taskId);

    // Переход
    const link = await Scripts.getRequestPagePath();

    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    //utils.redirectSPA(redirectUrl.toString());
    window.open(redirectUrl.toString(), "_blank");
  };

  //Детальная информация задач
  const getDetailsLayout = ({
    rowData,
    onClickRowHandler,
    reloadData,
  }: {
    rowData: TaskListData;
    onClickRowHandler?: () => void;
    reloadData?: () => void;
  }) => {
    return (
      <TaskDetails
        rowData={rowData}
        onClickRowHandler={onClickRowHandler}
        reloadData={reloadData}
        onClickNumberTask={onClickNumberTask}
      />
    );
  };
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер",
      code: "number",
      fr: 1,
      isSortable: true,
      isLink: true,
      onClick: onClickNumberTask,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип задачи",
      code: "type",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Вид задачи",
      code: "sort",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusTask",
      fr: 1,
      isSortable: true,
      isIcon: true,
    }),
    new ListColumnData({
      name: "Форма согласования",
      code: "formApproval",
      fr: 1,
    }),
    new ListColumnData({
      name: "Статус согласования",
      code: "statusApproval",
      fr: 1,
      isIcon: true,
    }),
    // Кнопка разворачивания
    new ListColumnData({
      code: "isOpen",
      name: "",
      fr: 1,
      fixedWidth: "56px",
      isIcon: true,
    }),
  ];

  const searchFields = columns
    .filter((col) => col.code !== "isOpen")
    .map((col) => col.code);

  /** Данные поиска */
  const getSearchDataWithQuery = (): TaskSearchData => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
      requestsIds: selectedRequestsIds,
      contractorsIds: selectedContractorsIds,
      insuredIds: selectedInsuredIds,
      isShowClosed: sliderActive,
    };
  };

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<TaskSearchData>(() => getSearchDataWithQuery());

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [
    searchQueryDebounced,
    selectedRequestsIds,
    selectedContractorsIds,
    selectedInsuredIds,
    contractorsSearchData,
    sliderActive,
  ]);

  return (
    <div className="request-list">
      <div className="request-list__search">
        {/* Поле поиска */}
        <CustomInput
          value={searchQuery}
          setValue={setSearchQuery}
          cursor="text"
          placeholder="Поиск"
        />
        <SliderPanel
          title="Закрытые задачи"
          isVisible={sliderActive ?? false}
          setIsVisible={(isActive) => {
            if (setSliderActive) setSliderActive(isActive);
          }}
        />
      </div>
      <div className="request-list__list">
        <CustomList<TaskSearchData, TaskListData>
          columnsSettings={columns}
          getDataHandler={Scripts.getTaskList}
          getDetailsLayout={getDetailsLayout}
          isScrollable={true}
          searchFields={searchFields}
          searchData={searchDataWithQuery}
        />
      </div>
    </div>
  );
}
