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
const baseMockDataArray: ContractorListData[] = [
  new ContractorListData({
    isIntegration: new ItemData({ value: "", info: true }),
    fullname: new ItemData({ value: "Иванов Иван Иванович", info: "test" }),
    type: new ItemData({ value: "Физлицо", info: "test" }),
    phone: new ItemData({ value: "79998887766", info: "test" }),
    email: new ItemData({ value: "ivanov@mail.ru", info: "test" }),
  }),
  new ContractorListData({
    isIntegration: new ItemData({ value: "", info: false }),
    fullname: new ItemData({ value: "Петров Петр Петрович", info: "test" }),
    type: new ItemData({ value: "Юрлицо", info: "test" }),
    phone: new ItemData({ value: "77776665544", info: "test" }),
    email: new ItemData({ value: "petrov@mail.ru", info: "test" }),
  }),
  new ContractorListData({
    isIntegration: new ItemData({ value: "", info: true }),
    fullname: new ItemData({
      value: "Викторов Виктор Викторович",
      info: "test",
    }),
    type: new ItemData({ value: "Юрлицо", info: "test" }),
    phone: new ItemData({ value: "78886665544", info: "test" }),
    email: new ItemData({ value: "viktor@mail.ru", info: "test" }),
  }),
];
/** Получение списка обратившихся */
async function getContractorList(
  page: number,
  sortData?: SortData
): Promise<FetchData<ContractorListData>> {
  await randomDelay();

  return {
    items: baseMockDataArray.map((data, index) => ({
      id: String(index),
      data,
    })),
    hasMore: false,
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
        id: new ItemDataString(`${index}`),
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
            "Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.",
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
    id: new ItemDataString(`${Math.floor(Math.random() * 100)}`),
    number: new ItemData({ value: "RW00000809/24", info: "test" }),
    createdAt: new ItemData({ value: "01.01.1990 14:17", info: "test" }),
    type: new ItemData({ value: "Медицинское", info: "test" }),
    sort: new ItemData({ value: "Запись к врачу", info: "test" }),
    statusTask: new ItemData({ value: "В очереди", info: "queue" }),
    formApproval: new ItemData({ value: "Устное", info: "test" }),
    statusApproval: new ItemData({ value: "Выпущено", info: "finished" }),
    description: new ItemDataString(
      "Согласовать запись к Терапевту, Хирургу и Травматологу по месту жительства"
    ),
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

/** Получить количество обратившихся*/
async function getCountConractor() {
  return 4;
}
/** Получить количество застрахованных*/
async function getCountInsured() {
  return 10;
}
/** Получить количество обращений*/
async function getCountRequest() {
  return 4;
}
/** Получить количество задач*/
async function getCountTask() {
  return 10;
}

declare const Context: any;

/** Получение кода страницы Обращение */
function getRequestPagePath(): string {
  return Context.data.request_page_path;
}
async function getRequestIdByTaskId(taskId: string): Promise<string> {
  return "test";
}

/** Получение кода страницы Контрагента */
function getContractorPageCode(): string {
  return Context.data.contractor_page_path ?? "";
}

export default {
  getContractorList,
  getInsuredList,
  getRequestList,
  getTaskList,

  getCountConractor,
  getCountInsured,
  getCountRequest,
  getCountTask,

  getRequestPagePath,
  getRequestIdByTaskId,
  getContractorPageCode,
};
