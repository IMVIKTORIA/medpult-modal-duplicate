import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorsSearchData, InsuredListDataDeduplication, ModalDuplicateMode } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import utils, { redirectSPA } from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";


/** Пропсы Модального окна */
type InsuredListProps = {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Режим модального окна */
  modalMode: ModalDuplicateMode
  /** Идентификаторы выбранных застрахованных */
  selectedInsuredIds: string[]
  /** Установить идентификаторы выбранных застрахованных */
  setSelectedInsuredIds: React.Dispatch<React.SetStateAction<string[]>>
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData
}

/** Данные поиска дубликатов застрахованного */
export interface InsuredSearchData extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string,
  /** Выбранные обратившиеся */
  contractorsIds?: string[]
}

/** Список застрахованных */
export default function InsuredList({selectedContractorsIds, modalMode, selectedInsuredIds, setSelectedInsuredIds, contractorsSearchData}: InsuredListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  /** Обработчик нажатия на кнопку "Выбрать" контрагента */
  const onClickChooseContractor = async () => {};

  /** Обработчик нажатия на кнопку "Oставить без измений"  */
  const onClickNotEdit = async () => {};

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async (contractorId: string) => {
    console.trace("wtf")
    if (!contractorId) return;
    const link = Scripts.getContractorPageCode();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (contractorId)
      redirectUrl.searchParams.set("contractor_id", contractorId);
    utils.redirectSPA(redirectUrl.toString());
  };

  /** Колонки для режима дедубликации застрахованного */
  const isIntegrationColumn = modalMode == ModalDuplicateMode.insured
    ?  [new ListColumnData({
      name: "",
      code: "isIntegration",
      fr: 0.2,
      isIcon: true,
    })]
    : []

  /** Колонки списка */
  const columns = [
    ...isIntegrationColumn,
    new ListColumnData({
      name: "ФИО",
      code: "fullname",
      fr: 1,
      isSortable: true,
      isLink: true,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Телефон",
      code: "phone",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Email",
      code: "email",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Статус",
      code: "statusContragent",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Начало действия",
      code: "policyStartDate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Окончание действия",
      code: "policyEndDate",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Страхователь",
      code: "insurer",
      fr: 1,
      isSortable: true,
    }),
    new ListColumnData({
      name: "Продукт",
      code: "product",
      fr: 1,
      isSortable: true,
    }),
  ];

  const searchFieldsCallback = () => {
    if(modalMode === ModalDuplicateMode.applicant) {
      return columns.map((col) => col.code)
    }
    
    return columns
      .filter((col) => col.code !== "isIntegration")
      .map((col) => col.code);
  }

  const searchFields = searchFieldsCallback();
  
  /** Данные поиска */
  const getSearchDataWithQuery = (): InsuredSearchData => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQuery,
      contractorsIds: selectedContractorsIds
    }
  }

  const [searchDataWithQuery, setSearchDataWithQuery] = useState<InsuredSearchData>(() => getSearchDataWithQuery())

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [searchQuery, selectedContractorsIds, contractorsSearchData])
  
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
        {
          modalMode === ModalDuplicateMode.insured &&
          (
            <>
              <div className="insured-list__search__button">
                <Button
                  title={"Выбрать"}
                  clickHandler={() => onClickChooseContractor()}
                  disabled={selectedInsuredIds.length === 0}
                />
                <Button
                  title={"Oставить без измений"}
                  clickHandler={() => onClickNotEdit()}
                  style={{ backgroundColor: "#FF4545" }}
                />
              </div>
              <Button
                title={"Редактировать"}
                clickHandler={() => onClickEdit(selectedInsuredIds[0])}
                icon={icons.EditButton}
                style={{
                  backgroundColor: "#fff",
                  color: "#6B6C6F",
                  pointerEvents: selectedInsuredIds.length === 0 ? "none" : "auto",
                }}
              />
            </>
          )
        }
      </div>
      <div className="insured-list__list">
        <CustomList<InsuredSearchData, InsuredListDataDeduplication>
          columnsSettings={columns}
          searchFields={searchFields}
          searchData={searchDataWithQuery}
          getDataHandler={Scripts.getInsuredListDeduplication}
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
