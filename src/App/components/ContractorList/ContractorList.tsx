import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  MyItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ContractorListData, ContractorsSearchData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import utils, {
  openContractor,
  openContractorInEditMode,
  redirectSPA,
  useDebounce,
} from "../../shared/utils/utils";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";
import ArrayColumnWithValidation from "../CustomColumns/ArrayColumnWithValidation/ArrayColumnWithValidation";

export interface ContractorListProps {
  /** Иденификаторы выбранных обратившихся */
  selectedContractorsIds: string[];
  /** Установить иденификаторы выбранных обратившихся */
  setSelectedContractorsIds: React.Dispatch<React.SetStateAction<string[]>>;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
}

/** Список обратившихся */
export default function ContractorList({
  selectedContractorsIds,
  setSelectedContractorsIds,
  contractorsSearchData,
}: ContractorListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Значение с debounce
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  /** Обработчик события нажатия на кнопку ссылки */
  async function setRequestContractorWorkTable() {
    // Получение выбранного контрагента из контекста
    const selectedContractorId = selectedContractorsIds[0];
    console.log("selectedContractorId", selectedContractorId);
    if (!selectedContractorId) return;
    const requestId =
      await Scripts.createRequestForContractor(selectedContractorId);
    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);

    redirectSPA(redirectUrl.toString());
  }

  async function setRequestContractor(fieldId?: string) {
    // Получение выбранного контрагента из контекста
    const selectedContractorId = selectedContractorsIds[0];
    if (!selectedContractorId) return;

    // Получение ссылки на страницу обращения
    const request_page_path = Scripts.getRequestPagePath();
    const mode = new URLSearchParams(window.location.search).get("mode");

    if (fieldId) await Scripts.assignInsured(fieldId, selectedContractorId);

    const url = new URL(window.location.href);
    const requestId = url.searchParams.get("request_id");

    const redirectUrl = new URL(
      window.location.origin + "/" + request_page_path
    );
    if (mode) {
      redirectUrl.searchParams.set("mode", mode);
    } else {
      if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    }

    redirectSPA(redirectUrl.toString());
  }

  /** Обработчик нажатия на кнопку "Выбрать" контрагента */
  const onClickChooseContractor = async () => {
    if (!selectedContractorsIds.length) return;

    const fieldId =
      new URLSearchParams(window.location.search).get("field_id") ?? "";

    if (fieldId === "medpult-worktable-call") {
      setRequestContractorWorkTable();
      return;
    }
    if (fieldId === "medpult-applicant-fullname-create") {
      setRequestContractor(fieldId);
      return;
    }

    // Открыть контрагента
    openContractor(selectedContractorsIds[0]);
  };

  /** Обработчик нажатия на кнопку "Oставить без измений"  */
  const onClickNotEdit = async () => {
    // Запустить стандартную логику сохранения
    Scripts.runCommonSave();
    // Закрыть окно
    Scripts.closeDeduplicationModal();
  };

  /** Обработчик нажатия на кнопку "Редактировать"  */
  const onClickEdit = async () => {
    if (!selectedContractorsIds.length) return;
    // Открыть контрагента
    openContractorInEditMode(selectedContractorsIds[0]);
  };

  /** Обработчик нажатия на застрахованного */
  const onClickContractor = async (contractor: MyItemData<string>) => {
    const contractorId = contractor.info;
    if (!contractorId) return;
    // Открыть контрагента
    openContractor(contractorId);
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
      onClick: onClickContractor,
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
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
    new ListColumnData({
      name: "Email",
      code: "email",
      fr: 1,
      getCustomColumComponent: ArrayColumnWithValidation,
    }),
  ];
  const searchFields = columns
    .filter((col) => col.code !== "isIntegration")
    .map((col) => col.code);

  /** Данные поиска */
  const getSearchDataWithQuery = (): ContractorsSearchDataExtended => {
    return {
      ...contractorsSearchData,
      searchQuery: searchQueryDebounced,
    };
  };

  const [searchDataWithQuery, setSearchDataWithQuery] =
    useState<ContractorsSearchDataExtended>(() => getSearchDataWithQuery());

  useEffect(() => {
    setSearchDataWithQuery(getSearchDataWithQuery());
  }, [searchQueryDebounced, contractorsSearchData]);

  const isDisabled = selectedContractorsIds.length === 0;
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
            //disabled={selectedContractorsIds.length === 0}
            style={{
              opacity: isDisabled ? "0.4" : "1",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          />
          <Button
            title={"Oставить без изменений"}
            clickHandler={() => onClickNotEdit()}
            style={{ backgroundColor: "#FF4545" }}
          />
        </div>
        <Button
          title={"Редактировать"}
          clickHandler={() => onClickEdit()}
          icon={icons.EditButton}
          style={{
            opacity: isDisabled ? "0.4" : "1",
            cursor: isDisabled ? "not-allowed" : "pointer",
            backgroundColor: "#fff",
            color: "#6B6C6F",
          }}
        />
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
