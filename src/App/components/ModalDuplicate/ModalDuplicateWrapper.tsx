import React, { useEffect, useState } from "react";
import Button from "../../../UIKit/Button/Button";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import InsuredList from "../InsuredList/InsuredList";
import ContractorList from "../ContractorList/ContractorList.tsx";
import RequestList from "../RequestList/RequestList.tsx";
import TaskList from "../TaskList/TaskList.tsx";
import icons from "../../shared/icons.tsx";
import Scripts from "../../shared/utils/clientScripts";
import { ContractorsSearchData, ContractorsSearchDataExtended, ModalDuplicateMode } from "../../shared/types.ts";
import ModalDuplicate, { ModalDuplicateProps } from "./ModalDuplicate.tsx";

/** Пропсы Модального окна */
export type ModalDuplicateWrapperProps = {
  /** Режим модального окна */
  modalMode: ModalDuplicateMode;
};
/** Обёртка модального окна с контроллером видимости */
export default function ModalDuplicateWrapper(props : ModalDuplicateWrapperProps) {
  // Состояние видимости модального окна
  const [isShowModal, setIsShowModal] = useState<boolean>();
  // Данные поиска дубликата
  const [contractorsSearchData, setContractorsSearchData] = useState<ContractorsSearchData>({});
  useEffect(() => {
    // Установить функцию обновления видимости модального окна извне
    Scripts.setUpdateShowModalCallback((isShowModal: boolean) => setIsShowModal(isShowModal))
    // Установить функцию обновления данных поиска контрагента вне виджета
    Scripts.setUpdateSearchDataCallback((searchData: ContractorsSearchData) => setContractorsSearchData(searchData));
  }, [])

  return (
    <>
      {isShowModal && <ModalDuplicate {...props} contractorsSearchData={contractorsSearchData}/>}
    </>
  );
}
