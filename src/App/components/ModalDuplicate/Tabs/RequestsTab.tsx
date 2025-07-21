import React, { useEffect, useState, useCallback } from "react";
import RequestList, { RequestListProps } from "../../RequestList/RequestList";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";

/** Список обращений */
export default function RequestsTab(props: RequestListProps) {
  const { selectedInsuredIds, selectedContractorsIds, contractorsSearchData } = props;

  //Состояние слайдера
  const [sliderActive, setSliderActive] = useState(false);
  // Общее количество обращений
  const [requestCount, setRequestCount] = useState<number>(0);
  // Обновить общее количество обращений
  async function updateRequestCount() {
    const count = await Scripts.getCountRequest(contractorsSearchData);
    setRequestCount(count);
  };

  // Количество отфильтрованных обращений
  const [filteredRequestsCount, setFilteredRequestsCount] = useState<number>(0);
  // Обновление количества отфильтрованных по застрахованным обращений
  async function updateFilteredRequestsCount() {
    // При выбранном застрахованном получить количество обращений по этому застрахованному с указанными фильтрами
    const count = await Scripts.getFilteredRequestsCount(selectedInsuredIds, selectedContractorsIds, contractorsSearchData, sliderActive)
    setFilteredRequestsCount(count)
  }

  // Обновить количества 
  async function updateCounts() {
    await updateRequestCount();
    await updateFilteredRequestsCount();
  }

  // При изменении выбранного застрахованного, фильтров или общего количества обращений
  useEffect(() => {
    setIsLoading(true)
    updateCounts().then(() => setIsLoading(false));
  }, [selectedInsuredIds, selectedContractorsIds, contractorsSearchData, sliderActive]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  function getCountString(count: number) {
    return isLoading ? "--" : `${count}`
  }

  // Вкладка обращения
  return (
    <TabItem
      code={"requests"}
      name={`Обращения (${getCountString(filteredRequestsCount)} из ${getCountString(requestCount)})`}
    >
      <RequestList {...props} sliderActive={sliderActive} setSliderActive={setSliderActive}/>
    </TabItem>
  );
}
