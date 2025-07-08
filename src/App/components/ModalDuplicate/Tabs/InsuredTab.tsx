import React, { useEffect, useState, useCallback } from "react";
import RequestList, { RequestListProps } from "../../RequestList/RequestList";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";
import InsuredList, {
  InsuredListProps,
} from "../../InsuredList/InsuredList.tsx";
import { ModalDuplicateMode } from "../../../shared/types.ts";

/** Список застрахованных */
export default function InsuredTab(props: InsuredListProps) {
  const { selectedContractorsIds, selectedInsuredIds, contractorsSearchData, modalMode } = props;

  // Общее количество застрахованных
  const [insuredCount, setInsuredCount] = useState<number>(0);
  // Обновить общее количество застрахованных
  async function updateInsuredCount() {
    const count = await Scripts.getCountInsured(contractorsSearchData);
    setInsuredCount(count);
  }

  // Количество отфильтрованных застрахованных
  const [filteredInsuredCount, setFilteredInsuredCount] = useState<number>(0);
  // Обновление количества отфильтрованных по застрахованным застрахованных
  async function updateFilteredInsuredCount() {
    // Для дедубликации застрахованных не расчитывать
    if(modalMode === ModalDuplicateMode.insured) return;

    // Если обратившийся не выбран, то обращения не фильтруются
    if (!selectedContractorsIds.length) {
      setFilteredInsuredCount(insuredCount);
      return;
    }

    // При выбранном обратившемся получить количество застрахованных по этому обратившемуся с указанными фильтрами
    const count = await Scripts.getFilteredInsuredCount(
      selectedContractorsIds,
      contractorsSearchData,
    );
    setFilteredInsuredCount(count);
  }

  // При изменении фильтров поиска
  useEffect(() => {
    updateInsuredCount();
  }, [contractorsSearchData]);

  // При изменении выбранного застрахованного, фильтров или общего количества застрахованных
  useEffect(() => {
    updateFilteredInsuredCount();
  }, [selectedContractorsIds, contractorsSearchData, insuredCount]);

  /** Получить количество выбранных застрахованных */
  const getSelectedInsuredCount = () => {
    // При дедубликации обратившегося - количество отфильтрованных застрахованных
    if(modalMode === ModalDuplicateMode.applicant) return filteredInsuredCount;

    // Иначе количество выбранных застрахованных
    return selectedInsuredIds.length
  };

  // Вкладка обращения
  return (
    <TabItem
      code={"insuredContragen"}
      name={`Застрахованные (${getSelectedInsuredCount()} из ${insuredCount})`} // TODO: Проработать логику для режима дедубликации обратившегося
    >
      <InsuredList {...props} />
    </TabItem>
  );
}
