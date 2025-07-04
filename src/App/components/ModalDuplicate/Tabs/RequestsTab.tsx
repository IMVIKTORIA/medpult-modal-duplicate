import React, { useEffect, useState, useCallback } from "react";
import RequestList, { RequestListProps } from "../../RequestList/RequestList";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";

/** Список обращений */
export default function RequestsTab(props: RequestListProps) {
  const { selectedInsuredIds, contractorsSearchData } = props;

  // Общее количество обращений
  const [requestCount, setRequestCount] = useState<number>(0);
  // Обновить общее количество обращений
  async function updateRequestCount() {
    const count = await Scripts.getCountRequest();
    setRequestCount(count);
  };

  // Количество отфильтрованных обращений
  const [filteredRequestsCount, setFilteredRequestsCount] = useState<number>(0);
  // Обновление количества отфильтрованных по застрахвованным обращений
  async function updateFilteredRequestsCount() {
    // Если застрахованный не выбран, то обращения не фильтруются
    if (!selectedInsuredIds.length) {
      setFilteredRequestsCount(requestCount)
      return;
    }

    // При выбранном застрахованном получить количество обращений по этому застрахованному с указанными фильтрами
    const count = await Scripts.getFilteredRequestsCount(selectedInsuredIds, contractorsSearchData)
    setFilteredRequestsCount(count)
  }

  // При изменении фильтров поиска
  useEffect(() => {
    updateRequestCount();
  }, [contractorsSearchData]);

  // При изменении выбранного застрахованного, фильтров или общего количества обращений
  useEffect(() => {
    updateFilteredRequestsCount();
  }, [selectedInsuredIds, contractorsSearchData, requestCount]);

  // Вкладка обращения
  return (
    <TabItem
      code={"requests"}
      name={`Обращения (${filteredRequestsCount} из ${requestCount})`}
    >
      <RequestList {...props} />
    </TabItem>
  );
}
