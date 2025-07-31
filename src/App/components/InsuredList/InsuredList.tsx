import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
  FetchData,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import {
  ContractorsSearchData,
  InsuredListDataDeduplication,
  ModalDuplicateMode,
} from "../../shared/types";

import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import utils, {
  openContractor,
  openContractorInEditMode,
  redirectSPA,
  useDebounce,
} from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";
import ArrayColumnWithValidation from "../CustomColumns/ArrayColumnWithValidation/ArrayColumnWithValidation";
import ColumnWithValidation from "../CustomColumns/ColumnWithValidation/ColumnWithValidation";
import ArrayColumnStatuses from "../CustomColumns/ArrayColumnStatuses/ArrayColumnStatuses";

/** Пропсы Модального окна */
export type InsuredListProps = {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Режим модального окна */
  modalMode: ModalDuplicateMode;
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[];
  /** Установить идентификаторы выбранных застрахованных */
  setSelectedInsuredIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
};

/** Данные поиска дубликатов застрахованного */
export interface InsuredSearchData extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
  /** Выбранные обратившиеся */
  contractorsIds?: string[];
}

/** Список застрахованных */
export default function InsuredList({
  selectedContractorsIds,
  modalMode,
  selectedInsuredIds,
  setSelectedInsuredIds,
  contractorsSearchData,
}: InsuredListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик нажатия на кнопку "Выбрать" контрагента */
  const onClickChooseContractor = async () => {
    // Запустить логику сохранения с выбранными застрахованными
    Scripts.runSaveWithInsured(selectedInsuredIds);
    // Закрыть окно
    Scripts.closeDeduplicationModal();
  };

  /** Обработчик нажатия на кнопку "Oставить без измений"  */
  const onClickNotEdit = async () => {
    if (hasFullDuplicate) return;
    // Запустить стандартную логику сохранения
    Scripts.runCommonSave();
    // Закрыть окно
    Scripts.closeDeduplicationModal();
  };

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async () => {
    if (!selectedInsuredIds.length) return;
    // Открыть контрагента в режиме изменения
    openContractorInEditMode(selectedInsuredIds[0]);
  };

  /** Обработчик нажатия на застрахованного */
  const onClickContractor = async (contractor: MyItemData<string>) => {
    const contractorId = contractor.info;
    if (!contractorId) return;
    // Открыть контрагента
    openContractor(contractorId);
  };

  /** Колонки для режима дедубликации застрахованного */
  const isIntegrationColumn =
    modalMode == ModalDuplicateMode.insured
      ? [
          new ListColumnData({
            name: "",
            code: "isIntegration",
            fr: 0.3,
            isIcon: true,
          }),
        ]
      : [];

  /** Колонки списка */
  const columns = [
    ...isIntegrationColumn,
    new ListColumnData({
      name: "ФИО",
      code: "fullname",
      fr: 1,
      isSortable: true,
      isLink: true,
      onClick: onClickContractor,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
      getCustomColumComponent: ColumnWithValidation,
    }),
    new ListColumnData({
      name: "Телефон",
      code: "phone",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Email",
      code: "email",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 1,
      getCustomColumComponent: ArrayColumnStatuses,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Начало действия",
      code: "policyStartDate",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Окончание действия",
      code: "policyEndDate",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Страхователь",
      code: "insurer",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Продукт",
      code: "product",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
  ];

  const searchFieldsCallback = () => {
    if (modalMode === ModalDuplicateMode.applicant) {
      return columns.map((col) => col.code);
    }

    return columns
      .filter((col) => col.code !== "isIntegration")
      .map((col) => col.code);
  };

  const searchFields = searchFieldsCallback();

  /** Данные поиска */
  const getSearchDataWithQuery = (): InsuredSearchData => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
      contractorsIds: selectedContractorsIds,
    };
  };

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<InsuredSearchData>(() => getSearchDataWithQuery());

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [searchQueryDebounced, selectedContractorsIds, contractorsSearchData]);

  const isDisabled = selectedInsuredIds.length === 0;

  //Есть ли полные дубли
  const [hasFullDuplicate, setHasFullDuplicate] = useState<boolean>(false);

  const handleGetData = async (
    page: number,
    sortData?: SortData,
    searchData?: InsuredSearchData
  ): Promise<FetchData<InsuredListDataDeduplication>> => {
    const response = await Scripts.getInsuredListDeduplication(
      page,
      sortData,
      searchData
    );

    const hasFull = response.items.some((item) => item.data.isFullDuplicate);
    setHasFullDuplicate(hasFull);

    return response;
  };

  return (
    <div className="insured-list">
      <div className="insured-list__search">
        {/* Поле поиска */}
        <CustomInput
          value={searchQuery}
          setValue={setSearchQuery}
          cursor="text"
          placeholder="Поиск"
        />
        {modalMode === ModalDuplicateMode.insured && (
          <>
            <div className="insured-list__search__button">
              <Button
                title={"Выбрать"}
                clickHandler={() => onClickChooseContractor()}
                //disabled={selectedInsuredIds.length === 0}
                style={{
                  opacity: isDisabled ? "0.4" : "1",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              />
              <Button
                title={"Oставить без изменений"}
                clickHandler={() => onClickNotEdit()}
                style={{
                  backgroundColor: "#FF4545",
                  opacity: hasFullDuplicate ? "0.4" : "1",
                  cursor: hasFullDuplicate ? "not-allowed" : "pointer",
                }}
              />
            </div>
            <Button
              title={"Редактировать"}
              clickHandler={() => onClickEdit()}
              icon={icons.EditButton}
              //disabled={selectedInsuredIds.length === 0}
              style={{
                opacity: isDisabled ? "0.4" : "1",
                cursor: isDisabled ? "not-allowed" : "pointer",
                backgroundColor: "#fff",
                color: "#6B6C6F",
              }}
            />
          </>
        )}
      </div>
      <div className="insured-list__list">
        <CustomList<InsuredSearchData, InsuredListDataDeduplication>
          columnsSettings={columns}
          searchFields={searchFields}
          searchData={searchDataWithQuery}
          //getDataHandler={Scripts.getInsuredListDeduplication}
          getDataHandler={handleGetData}
          isScrollable={true}
          // height="500px"
          isSelectable={true}
          isMultipleSelect={false}
          setSelectedItems={(ids: string[]) => setSelectedInsuredIds(ids)}
          selectedItems={selectedInsuredIds}
        />
      </div>
    </div>
  );
}
