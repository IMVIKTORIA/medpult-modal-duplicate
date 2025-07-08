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
import {
  ContractorsSearchData,
  ModalDuplicateMode,
} from "../../shared/types.ts";
import RequestsTab from "./Tabs/RequestsTab.tsx";
import InsuredTab from "./Tabs/InsuredTab.tsx";
import TasksTab from "./Tabs/TasksTab.tsx";

/** Пропсы Модального окна */
export type ModalDuplicateProps = {
  /** Режим модального окна */
  modalMode: ModalDuplicateMode;
  /** Поисковые данные контрагента */
  contractorsSearchData: ContractorsSearchData;
};

/**Модальное окно */

export default function ModalDuplicate({
  modalMode,
  contractorsSearchData,
}: ModalDuplicateProps) {
  //общее количество обратившихся
  const [contractorCount, setContractorCount] = useState<number>(0);
  const fetchContractorCount = async () => {
    const count = await Scripts.getCountConractor();
    setContractorCount(count);
  };

  //общее количество застрахованных
  const [insuredCount, setInsuredCount] = useState<number>(0);
  const fetchInsuredCount = async () => {
    const count = await Scripts.getCountInsured(contractorsSearchData);
    setInsuredCount(count);
  };

  //Закрыть модальное окно
  const modalClose = () => Scripts.closeDeduplicationModal();

  // Получить заголовок модалки
  const getModalTitle = () => {
    switch (modalMode) {
      case ModalDuplicateMode.applicant:
        return "Возможные дубли обратившегося";
      case ModalDuplicateMode.insured:
        return "Возможные дубли застрахованного";

      default:
        throw new Error("Не указан режим модального окна");
    }
  };

  // Идентификаторы выбранных обратившихся
  const [selectedContractorsIds, setSelectedContractorsIds] = useState<string[]>([]);
  // Идентификаторы выбранных застрахованных
  const [selectedInsuredIds, setSelectedInsuredIds] = useState<string[]>([]);
  // Идентификаторы выбранных обращений
  const [selectedRequestsIds, setSelectedRequestsIds] = useState<string[]>([]);
  // Идентификаторы выбранных задач
  const [selectedTasksIds, setSelectedTasksIds] = useState<string[]>([]);

  //общее количество обратившихся
  const [contractorCount, setContractorCount] = useState<number>(0);
  const fetchContractorCount = async () => {
    const count = await Scripts.getCountConractor();
    setContractorCount(count);
  };
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
  );

  // Вкладка застрахованные
  const insuredTab = InsuredTab({
    contractorsSearchData: contractorsSearchData,
    selectedContractorsIds: selectedContractorsIds,
    modalMode: modalMode,
    selectedInsuredIds: selectedInsuredIds,
    setSelectedInsuredIds: setSelectedInsuredIds,
  })

  // Вкладка обращения
  const requestsTab = RequestsTab({
    selectedInsuredIds: selectedInsuredIds,
    contractorsSearchData: contractorsSearchData,
    selectedRequestsIds: selectedRequestsIds,
    setSelectedRequestsIds: setSelectedRequestsIds,
  });

  // Вкладка задачи
  const tasksTab = TasksTab({
    selectedRequestsIds: selectedRequestsIds,
    contractorsSearchData: contractorsSearchData,
    selectedTasksIds: selectedTasksIds,
    setSelectedTasksIds: setSelectedTasksIds,
  });

  useEffect(() => {
    fetchContractorCount();
    fetchTaskCount();
  }, [contractorsSearchData]);

  return (
    <ModalWrapper modalMode={modalMode}>
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
  );
}
