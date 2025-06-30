import {
  FetchData,
  ItemData,
  ItemDataString,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import {
  ContractorListData,
  InsuredListData,
  RequestListData,
  TaskListData,
} from "../types";
/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка обратившихся */
async function getContractorList(
  page: number,
  sortData?: SortData
): Promise<FetchData<ContractorListData>> {
  await randomDelay();
  const mockData: ContractorListData = {
    isIntegration: new ItemData({ value: "", info: "true" }),
    fullname: new ItemData({ value: "Иванов Иван Иванович", info: "test" }),
    type: new ItemData({ value: "Физлицо", info: "test" }),
    phone: new ItemData({ value: "+7 999 888 77 66", info: "test" }),
    email: new ItemData({ value: "ivanov@mail.ru", info: "test" }),
  };
  return {
    items: Array(7)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new ContractorListData(mockData),
        };
      }),
    hasMore: true,
  };
}

/** Получение списка застрахованных */
async function getInsuredList(
  page: number,
  sortData?: SortData
): Promise<FetchData<InsuredListData>> {
  await randomDelay();
  const mockData: InsuredListData = {
    fullname: new ItemData({ value: "Иванов Иван Иванович", info: "test" }),
    birthdate: new ItemData({ value: "10.10.1990", info: "test" }),
    phone: new ItemData({ value: "+7 999 888 77 66", info: "test" }),
    email: new ItemData({ value: "ivanov@mail.ru", info: "test" }),
    statusContragent: new ItemData({ value: "Gold", info: "Gold" }),
    policy: new ItemData({ value: "00SB755380849982/1", info: "test" }),
    policyStartDate: new ItemData({ value: "20.01.2025", info: "test" }),
    policyEndDate: new ItemData({ value: "20.02.2025", info: "test" }),
    insurer: new ItemData({ value: "Петров Петр Петрович", info: "test" }),
    product: new ItemData({ value: "ДМС макси пр", info: "test" }),
  };

  return {
    items: Array(7)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new InsuredListData(mockData),
        };
      }),
    hasMore: true,
  };
}

/** Получение списка обращений */
async function getRequestList(
  page: number,
  sortData?: SortData
): Promise<FetchData<RequestListData>> {
  await randomDelay();

  // разные статусами
  const statuses = ["zakryto", "vrabote"];

  const items = Array(7)
    .fill(0)
    .map((_, index) => {
      const statusInfo = statuses[index % statuses.length];
      const statusValue =
        statusInfo === "zakryto"
          ? "Закрыто"
          : statusInfo === "vrabote"
          ? "В работе"
          : "На ожидании";

      const mockData: RequestListData = {
        number: new ItemData({ value: `RW00000${index}/24`, info: "test" }),
        createdAt: new ItemData({ value: "01.01.1990 14:17", info: "test" }),
        channel: new ItemData({ value: "Телефон", info: "test" }),
        topic: new ItemData({
          value: "Согласование медицинских услуг",
          info: "test",
        }),
        statusRequest: new ItemData({ value: statusValue, info: statusInfo }),
        reason: new ItemData({
          value:
            "Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.",
          info: "test",
        }),
      };

      return {
        id: String(index),
        data: new RequestListData(mockData),
      };
    });

  return {
    items,
    hasMore: true,
  };
}

/** Получение списка задач */
async function getTaskList(
  page: number,
  sortData?: SortData
): Promise<FetchData<TaskListData>> {
  await randomDelay();
  const mockData: TaskListData = {
    number: new ItemData({ value: "RW00000809/24", info: "test" }),
    createdAt: new ItemData({ value: "01.01.1990 14:17", info: "test" }),
    type: new ItemData({ value: "Медицинское", info: "test" }),
    sort: new ItemData({ value: "Запись к врачу", info: "test" }),
    statusTask: new ItemData({ value: "В очереди", info: "queue" }),
    formApproval: new ItemData({ value: "Устное", info: "test" }),
    statusApproval: new ItemData({ value: "Выпущено", info: "finished" }),
  };
  return {
    items: Array(7)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new TaskListData(mockData),
        };
      }),
    hasMore: true,
  };
}

export default {
  getContractorList,
  getInsuredList,
  getRequestList,
  getTaskList,
};
