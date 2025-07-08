import React, { useEffect, useState, useCallback } from "react";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";
import ContractorList, {
  ContractorListProps,
} from "../../ContractorList/ContractorList.tsx";

/** Список обратившихся */
export default function ContractorsTab(props: ContractorListProps) {
  const {
    selectedContractorsIds,
    contractorsSearchData,
    setSelectedContractorsIds,
  } = props;

  // Общее количество обратившихся
  const [contractorCount, setContractorCount] = useState<number>(0);
  const fetchContractorCount = async () => {
    const count = await Scripts.getCountConractor();
    setContractorCount(count);
  };

  /** Количество выбранных обратившихся */
  const selectedContractorCount = selectedContractorsIds.length;

  useEffect(() => {
    fetchContractorCount();
  }, [contractorsSearchData]);

  // Вкладка обращения
  return (
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
}
