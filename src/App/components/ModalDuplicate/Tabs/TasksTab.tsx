import React, { useEffect, useState, useCallback } from "react";
import TaskList, { TaskListProps } from "../../TaskList/TaskList.tsx";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import Scripts from "../../../shared/utils/clientScripts.ts";

interface TasksTab extends TaskListProps {
  code: string;
}

/** Список обращений */
export default function TasksTab(props: TaskListProps) {
  const { selectedRequestsIds, selectedContractorsIds, selectedInsuredIds, contractorsSearchData } = props;

  //Состояние слайдера
  const [sliderActive, setSliderActive] = useState(false);
  // Общее количество задач
  const [taskCount, setTaskCount] = useState<number>(0);
  // Обновить общее количество задач
  async function updateTaskCount() {
    const count = await Scripts.getCountTask(contractorsSearchData);
    setTaskCount(count);
  }

  // Количество отфильтрованных задач
  const [filteredTasksCount, setFilteredTasksCount] = useState<number>(0);
  // Обновление количества отфильтрованных по обращениям задач
  async function updateFilteredTaskCount() {
    // Если Обращение не выбрано, то задачи не фильтруются
    // if (!selectedRequestsIds.length && sliderActive) {
    //   setFilteredTasksCount(taskCount);
    //   return;
    // }

    // При выбранном обращении получить количество задач по этому обращению с указанными фильтрами
    const count = await Scripts.getFilteredTasksCount(
      selectedContractorsIds, 
      selectedInsuredIds,
      selectedRequestsIds,
      contractorsSearchData,
      sliderActive
    );
    setFilteredTasksCount(count);
  }

  // При изменении фильтров поиска
  useEffect(() => {
    setIsLoading(true)
    updateTaskCount().then(() => setIsLoading(false));
  }, [contractorsSearchData]);

  // При изменении выбранного обращения, фильтров или общего количества задач
  useEffect(() => {
    setIsLoading(true)
    updateFilteredTaskCount().then(() => setIsLoading(false));
  }, [selectedRequestsIds, contractorsSearchData, selectedContractorsIds, selectedInsuredIds, taskCount, sliderActive]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  function getCountString(count: number) {
    return isLoading ? "--" : `${count}`
  }

  // Вкладка задачи
  return (
    <TabItem
      code={"tasks"}
      name={`Задачи (${getCountString(filteredTasksCount)} из ${getCountString(taskCount)})`}
    >
      <TaskList
        {...props}
        sliderActive={sliderActive}
        setSliderActive={setSliderActive}
      />
    </TabItem>
  );
}
