import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorListData, ContractorsSearchData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import utils from "../../shared/utils/utils";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";

interface ContractorListProps {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Установить иденификаторы выбранных обратившихся */
  setSelectedContractorsIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string,
}

/** Список обратившихся */
export default function ContractorList({selectedContractorsIds, setSelectedContractorsIds, contractorsSearchData}: ContractorListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  /** Обработчик нажатия на кнопку "Выбрать" контрагента */
  const onClickChooseContractor = async () => {};

  /** Обработчик нажатия на кнопку "Oставить без измений"  */
  const onClickNotEdit = async () => {};

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async (contractorId: string) => {
    if (!contractorId) return;
    const link = Scripts.getContractorPageCode();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (contractorId)
      redirectUrl.searchParams.set("contractor_id", contractorId);
    utils.redirectSPA(redirectUrl.toString());
  };

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "",
      code: "isIntegration",
      fr: 0.2,
      isIcon: true,
    }),
    new ListColumnData({
      name: "ФИО",
      code: "fullname",
      fr: 1,
      isSortable: true,
      isLink: true,
    }),
    new ListColumnData({
      name: "Тип контрагента",
      code: "type",
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
  ];
  const searchFields = columns
    .filter((col) => col.code !== "isIntegration")
    .map((col) => col.code);

  /** Данные поиска */
  const getSearchDataWithQuery = (): ContractorsSearchDataExtended => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQuery,
    };
  };

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<ContractorsSearchDataExtended>(() => getSearchDataWithQuery());

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [searchQuery, contractorsSearchData]);
  
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
        <div className="insured-list__search__button">
          <Button
            title={"Выбрать"}
            clickHandler={() => onClickChooseContractor()}
            disabled={selectedContractorsIds.length === 0}
          ></Button>
          <Button
            title={"Oставить без измений"}
            clickHandler={() => onClickNotEdit()}
            style={{ backgroundColor: "#FF4545" }}
          ></Button>
        </div>
        <Button
          title={"Редактировать"}
          clickHandler={() => onClickEdit(selectedContractorsIds[0])}
          icon={icons.EditButton}
          style={{
            backgroundColor: "#fff",
            color: "#6B6C6F",
            pointerEvents:
              selectedContractorsIds.length === 0 ? "none" : "auto",
          }}
        ></Button>
      </div>
      <div className="insured-list__list">
        <CustomList<ContractorsSearchDataExtended, ContractorListData>
          columnsSettings={columns}
          getDataHandler={Scripts.getContractorList}
          searchData={searchDataWithQuery}
          searchFields={searchFields}
          isSelectable={true}
          isMultipleSelect={false}
          setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
          selectedItems={selectedContractorsIds}
          isScrollable={true}
        />
      </div>
    </div>
  );
}
