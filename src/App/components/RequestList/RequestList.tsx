import React, { useEffect, useState, useCallback } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ItemDataString,
  ListColumnData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorsSearchData, RequestListData } from "../../shared/types";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes.ts";
import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import SliderPanel from "../SliderPanel/SliderPanel";
import RequestDetails from "./RequestDetails/RequestDetails.tsx";
import utils from "../../shared/utils/utils";

export type RequestListProps = {
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[];
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
  /** Выбранные обращения */
  selectedRequestsIds: string[];
  /** Установить выбранные обращения */
  setSelectedRequestsIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Показывать закрытые задачи */
  sliderActive?: boolean;
  /** Изменить значение показывать закрытые задачи */
  setSliderActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Данные поиска обращений */
export interface RequestSearchData extends ContractorsSearchData {
  /** Поисковый запрос */
  searchQuery?: string;
  /** Идентификаторы выбранных застрахованных */
  insuredIds?: string[];
  /** Показывать закрытые задачи */
  isShowClosed?: boolean;
}

/** Список обращений */
export default function RequestList({
  selectedInsuredIds,
  contractorsSearchData,
  selectedRequestsIds,
  setSelectedRequestsIds,
  sliderActive,
  setSliderActive,
}: RequestListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  /** Обработчик нажатия на номер обращения */
  const onClickNumberRequest = async (requestInfo: MyItemData) => {
    const requestId = requestInfo.info;
    await openRequest(requestId);
  };

  /** Открыть обращение */
  const openRequest = async (requestId?: string) => {
    if (!requestId) return;

    utils.setRequest(requestId);

    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    // utils.redirectSPA(redirectUrl.toString());
    window.open(redirectUrl.toString(), "_blank");
  };

  //Детальная информация обращений
  const getDetailsLayout = ({
    rowData,
    onClickRowHandler,
    reloadData,
  }: {
    rowData: RequestListData;
    onClickRowHandler?: () => void;
    reloadData?: () => void;
  }) => {
    return (
      <RequestDetails
        rowData={rowData}
        onClickRowHandler={onClickRowHandler}
        reloadData={reloadData}
        onClickNumberRequest={openRequest}
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
      onClick: onClickNumberRequest,
    }),
    new ListColumnData({
      name: "Дата создания",
      code: "createdAt",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тип канала",
      code: "channel",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Тема обращения",
      code: "topic",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusRequest",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Причина обращения",
      code: "reason",
      fr: 2,
      isSortable: true,
    }),
    // Кнопка разворачивания
    new ListColumnData({
      code: "isOpen",
      name: "",
      fr: 1,
      fixedWidth: "36px",
      isIcon: true,
    }),
  ];

  const searchFields = columns
    .filter((col) => col.code !== "isOpen")
    .map((col) => col.code);

  /** Данные поиска */
  const getSearchDataWithQuery = (): RequestSearchData => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQuery,
      insuredIds: selectedInsuredIds,
      isShowClosed: sliderActive,
    };
  };

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<RequestSearchData>(() => getSearchDataWithQuery());

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [searchQuery, selectedInsuredIds, contractorsSearchData, sliderActive]);

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
          title="Закрытые обращения"
          isVisible={sliderActive ?? false}
          setIsVisible={(isActive) => {
            if (setSliderActive) setSliderActive(isActive);
          }}
        />
      </div>
      <div className="request-list__list">
        <CustomList<RequestSearchData, RequestListData>
          columnsSettings={columns}
          getDataHandler={Scripts.getRequestList}
          getDetailsLayout={getDetailsLayout}
          isScrollable={true}
          searchFields={searchFields}
          searchData={searchDataWithQuery}
          isSelectable={true}
          isMultipleSelect={false}
          setSelectedItems={(ids: string[]) => setSelectedRequestsIds(ids)}
          selectedItems={selectedRequestsIds}
        />
      </div>
    </div>
  );
}
