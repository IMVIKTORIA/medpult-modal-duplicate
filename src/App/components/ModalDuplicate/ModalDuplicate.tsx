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

/** Пропсы Модального окна */
type ModalDuplicateProps = {
  /** Режим модального окна */
  modalMode: ModalDuplicateMode
}

/**Модальное окно */
export default function ModalDuplicate({modalMode} : ModalDuplicateProps) {
  //общее количество обратившихся
  const [contractorCount, setContractorCount] = useState<number>(0);
  const fetchContractorCount = async () => {
    const count = await Scripts.getCountConractor();
    setContractorCount(count);
  };
  
  //общее количество застрахованных
  const [insuredCount, setInsuredCount] = useState<number>(0);
  const fetchInsuredCount = async () => {
    const count = await Scripts.getCountInsured();
    setInsuredCount(count);
  };
  //общее количество обращений
  const [requestCount, setRequestCount] = useState<number>(0);
  const fetchRequestCount = async () => {
    const count = await Scripts.getCountRequest();
    setRequestCount(count);
  };
  //общее количество задач
  const [taskCount, setTaskCount] = useState<number>(0);
  const fetchTaskCount = async () => {
    const count = await Scripts.getCountTask();
    setTaskCount(count);
  };

  useEffect(() => {
    fetchContractorCount();
    fetchInsuredCount();
    fetchRequestCount();
    fetchTaskCount();
  }, []);

  //Закрыть модальное окно
  const modalClose = () => {};

  // Получить заголовок модалки
  const getModalTitle = () => {
    switch(modalMode) {
      case ModalDuplicateMode.applicant: return 'Возможные дубли обратившегося'
      case ModalDuplicateMode.insured: return 'Возможные дубли застрахованного'

      default: throw new Error("Не указан режим модального окна")
    }
  }

  // Данные поиска дубликата
  const [contractorsSearchData, setContractorsSearchData] = useState<ContractorsSearchData>({});
  // Состояние видимости модального окна
  const [isShowModal, setIsShowModal] = useState<boolean>();
  useEffect(() => {
    // Установить функцию обновления данных поиска контрагента вне виджета
    Scripts.setUpdateSearchDataCallback((searchData: ContractorsSearchData) => setContractorsSearchData(searchData))
    // Установить функцию обновления видимости модального окна извне
    Scripts.setUpdateShowModalCallback((isShowModal: boolean) => setIsShowModal(isShowModal))
  }, [])

  
  // Идентификаторы выбранных обратившихся
  const [selectedContractorsIds, setSelectedContractorsIds] = useState<string[]>([]);
  /** Количество выбранных обратившихся */
  const selectedContractorCount = selectedContractorsIds.length;
  
  // Вкладка обратившиеся
  const applicantTab = (
    <TabItem
      code={"requestContragen"}
      name={`Обратившиеся (${selectedContractorCount} из ${contractorCount})`}
    >
      <ContractorList
        selectedContractorsIds={selectedContractorsIds}
        setSelectedContractorsIds={setSelectedContractorsIds}
        contractorsSearchData={contractorsSearchData}
      />
    </TabItem>
  )


  // Идентификаторы выбранных застрахованных
  const [selectedInsuredIds, setSelectedInsuredIds] = useState<string[]>([]);
  /** Количество выбранных застрахованных */
  const selectedInsuredCount = selectedInsuredIds.length;
  // Вкладка застрахованные
  const insuredTab = (
    <TabItem
      code={"insuredContragen"}
      name={`Застрахованные (${selectedInsuredCount} из ${insuredCount})`}
    >
      <InsuredList 
        selectedContractorsIds={selectedContractorsIds}
        modalMode={modalMode}
        selectedInsuredIds={selectedInsuredIds}
        setSelectedInsuredIds={setSelectedInsuredIds}
        contractorsSearchData={contractorsSearchData}
      />
    </TabItem>
  )
  
  // Идентификаторы выбранных обращений
  const [selectedRequestsIds, setSelectedRequestsIds] = useState<string[]>([]);
  // Вкладка обращения
  const requestsTab = (
    <TabItem
      code={"requests"}
      name={`Обращения (${requestCount} из ${requestCount})`}
    >
      <RequestList 
        selectedInsuredIds={selectedInsuredIds} 
        contractorsSearchData={contractorsSearchData}
        selectedRequestsIds={selectedRequestsIds}
        setSelectedRequestsIds={setSelectedRequestsIds}
      />
    </TabItem>
  )

  // Вкладка обращения
  const tasksTab = (
    <TabItem
      code={"tasks"}
      name={`Задачи (${taskCount} из ${taskCount})`}
    >
      <TaskList 
        selectedRequestsIds={selectedRequestsIds} 
      />
    </TabItem>
  )
  
  // Разметка модалки
  const modalLayout = (
    <ModalWrapper>
      <div className="duplicate-modal">
        <div className="duplicate-modal__header">
          <span className="duplicate-modal__header__label">
            {getModalTitle()}
          </span>
          <span
            className="duplicate-modal__header__closed"
            onClick={modalClose}
          >
            {icons.Cross}
          </span>
        </div>
        <div className="duplicate-modal__content">
          <TabsWrapper>
            {/* Вкладка обратившиеся только для режима дедубликации Обратившегося */}
            {modalMode === ModalDuplicateMode.applicant && applicantTab}

            {/* Вкладка застрахованных */}
            {insuredTab}

            {/* Вкладка обращений */}
            {requestsTab}

            {/* Вкладка задач */}
            {tasksTab}
          </TabsWrapper>
        </div>
      </div>
    </ModalWrapper>
  )

  return (
    <>
      {isShowModal && modalLayout}
    </>
  );
}
