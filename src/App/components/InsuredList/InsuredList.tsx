import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  ItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { InsuredListData, ModalDuplicateMode } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import CustomInput from "../../../UIKit/CustomInput/CustomInput";
import utils, { redirectSPA } from "../../shared/utils/utils";
import Button from "../../../UIKit/Button/Button";
import icons from "../../shared/icons";


/** Пропсы Модального окна */
type InsuredListProps = {
  /** Режим модального окна */
  modalMode: ModalDuplicateMode
  /** Установить количество выбранных застрахованных */
  setSelectedInsuredCount: (count: number) => void;
}

/** Список застрахованных */
export default function InsuredList({modalMode, setSelectedInsuredCount}: InsuredListProps) {
  // Поисковый запрос
  const [searchQuery, setSearchQuery] = useState<string>("");

  /** Идентификаторы выбранных контрагентов */
  const [selectedInsuredIds, setSelectedInsuredIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedInsuredCount(selectedInsuredIds.length);
  }, [selectedInsuredIds, setSelectedInsuredCount]);

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
                  clickHandler={onClickChooseContractor()}
                  disabled={selectedInsuredIds.length === 0}
                />
                <Button
                  title={"Oставить без измений"}
                  clickHandler={onClickNotEdit()}
                  style={{ backgroundColor: "#FF4545" }}
                />
              </div>
              <Button
                title={"Редактировать"}
                clickHandler={onClickEdit(selectedInsuredIds[0])}
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
        <CustomList<string, InsuredListData>
          columnsSettings={columns}
          searchFields={searchFields}
          searchData={searchQuery}
          getDataHandler={Scripts.getInsuredList}
          isScrollable={false}
          isSelectable={modalMode == ModalDuplicateMode.insured}
          isMultipleSelect={false}
          setSelectedItems={(ids: string[]) => setSelectedInsuredIds(ids)}
          selectedItems={selectedInsuredIds}
        />
      </div>
    </div>
  );
}
