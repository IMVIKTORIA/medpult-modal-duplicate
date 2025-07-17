import React, { useEffect, useState, useCallback } from "react";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";
import ContractorList, {
  ContractorListProps,
} from "../../ContractorList/ContractorList.tsx";
import Loader from "../../../../UIKit/Loader/Loader.tsx";


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
    const count = await Scripts.getCountConractor(contractorsSearchData);
    setContractorCount(count);
  };
  
  useEffect(() => {
    fetchContractorCount();
  }, [contractorsSearchData]);
  
  const [isCountLoading, setIsCountLoading] = useState<boolean>(false)

  // Вкладка обращения
  return (
    <TabItem
      code={"requestContragen"}
      // name={`Обратившиеся (${contractorCount})`}
      name={`Обратившиеся (--)`}
    >
      <ContractorList
        selectedContractorsIds={selectedContractorsIds}
        setSelectedContractorsIds={setSelectedContractorsIds}
        contractorsSearchData={contractorsSearchData}
      />
    </TabItem>
  );
}
