import {
  FetchData,
  ItemData,
  ItemDataString,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { InsuredSearchData } from "../../components/InsuredList/InsuredList";
import { RequestSearchData } from "../../components/RequestList/RequestList";
import { TaskSearchData } from "../../components/TaskList/TaskList";
import {
  ContractorListData,
  ContractorsSearchData,
  ContractorsSearchDataExtended,
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
    id: new ItemDataString("1"),
    isIntegration: new ItemData({ value: "", info: true }),
    fullname: new ItemDataString("Иванов Иван Иванович"),
    type: new ItemDataString("Физлицо"),
    phone: new ItemDataString("79998887766"),
    email: new ItemDataString("ivanov@mail.ru"),
  }),
  new ContractorListData({
    id: new ItemDataString("2"),
    isIntegration: new ItemData({ value: "", info: false }),
    fullname: new ItemDataString("Петров Петр Петрович"),
    type: new ItemDataString("Юрлицо"),
    phone: new ItemDataString("77776665544"),
    email: new ItemDataString("petrov@mail.ru"),
  }),
  new ContractorListData({
    id: new ItemDataString("3"),
    isIntegration: new ItemData({ value: "", info: true }),
    fullname: new ItemDataString("Викторов Виктор Викторович"),
    type: new ItemDataString("Юрлицо"),
    phone: new ItemDataString("78886665544"),
    email: new ItemDataString("viktor@mail.ru"),
  }),
];
/** Получение списка обратившихся */
async function getContractorList(
  page: number,
  sortData?: SortData,
  searchData?: ContractorsSearchDataExtended
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
  sortData?: SortData,
  searchData?: InsuredSearchData
): Promise<FetchData<InsuredListData>> {
  await randomDelay();
  const mockData: InsuredListData = {
    isIntegration: new ItemData({ value: "", info: true }),
    fullname: new ItemDataString("Иванов Иван Иванович"),
    birthdate: new ItemDataString("10.10.1990"),
    phone: new ItemDataString("+7 999 888 77 66"),
    email: new ItemDataString("ivanov@mail.ru"),
    statusContragent: new ItemData({ value: "Gold", info: "Gold" }),
    policy: new ItemDataString("00SB755380849982/1"),
    policyStartDate: new ItemDataString("20.01.2025"),
    policyEndDate: new ItemDataString("20.02.2025"),
    insurer: new ItemDataString("Петров Петр Петрович"),
    product: new ItemDataString("ДМС макси прочее"),
  };

  return {
    items: Array(20)
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
  sortData?: SortData,
  searchData?: RequestSearchData
): Promise<FetchData<RequestListData>> {
  await randomDelay();
  const statusList = [
    { info: "sozdano", value: "Создано" },
    { info: "vrabote", value: "В работе" },
    { info: "utochnenie-zaprosa", value: "Уточнение запроса" },
    { info: "v-ozhidanii", value: "В ожидании" },
    { info: "otkryto", value: "Открыто" },
    { info: "zakryto", value: "Закрыто" },
  ];

  const items = Array(13)
    .fill(0)
    .map((_, index) => {
      const status = statusList[index % statusList.length];
      const mockData: RequestListData = {
        id: new ItemDataString(`${index}`),
        number: new ItemDataString(`RW00000${index}/24`),
        createdAt: new ItemDataString("01.01.1990 14:17"),
        channel: new ItemDataString("Телефон"),
        topic: new ItemDataString("Согласование медицинских услуг"),
        statusRequest: new ItemData({ value: status.value, info: status.info }),
        reason: new ItemDataString(
          "Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками.Информация о состоянии здоровья предоставляется пациенту лично лечащим врачом или другими медицинскими работниками."
        ),
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
  sortData?: SortData,
  searchData?: TaskSearchData
): Promise<FetchData<TaskListData>> {
  await randomDelay();
  const statusTaskList = [
    { info: "queue", value: "В очереди" },
    { info: "atWork", value: "В работе" },
    { info: "control", value: "Контроль" },
    { info: "postpone", value: "Отложена" },
    { info: "complete", value: "Выполнено" },
    { info: "returned", value: "Возвращена" },
  ];

  const statusApprovalList = [
    { info: "processing", value: "В оформлении" },
    { info: "finished", value: "Выпущено" },
    { info: "finishedSend", value: "Выпущено (отправлено)" },
    { info: "cancelled", value: "Отозвано" },
  ];
  const items = Array(13)
    .fill(0)
    .map((_, index) => {
      const statusTask = statusTaskList[index % statusTaskList.length];
      const statusApproval =
        statusApprovalList[index % statusApprovalList.length];
      const mockData: TaskListData = {
        id: new ItemDataString(`${index}`),
        number: new ItemDataString(`TS00000${index}/24`),
        createdAt: new ItemDataString("01.01.1990 14:17"),
        type: new ItemDataString("Медицинское"),
        sort: new ItemDataString("Запись к врачу"),
        statusTask: new ItemData({
          value: statusTask.value,
          info: statusTask.info,
        }),
        formApproval: new ItemDataString("Устное"),
        statusApproval: new ItemData({
          value: statusApproval.value,
          info: statusApproval.info,
        }),
        description: new ItemDataString(
          "Согласовать запись к Терапевту, Хирургу и Травматологу по месту жительства"
        ),
      };
      return {
        id: String(index),
        data: new TaskListData(mockData),
      };
    });

  return {
    items,
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

type UpdateSearchDataCallback = (searchData: ContractorsSearchData) => void
/** Функция обновления данных поиска контрагента */
let updateSearchDataCallback: UpdateSearchDataCallback | undefined;
/** Установка функции обновления данных поиска контрагента */
function setUpdateSearchDataCallback(callback: UpdateSearchDataCallback) {
  updateSearchDataCallback = callback;

  window["updateSearchDataCallback"] = updateShowModalCallback; // DEBUG ONLY
}

type UpdateShowModalCallback = (isShowModal: boolean) => void
/** Функция обновления видимости модального окна */
let updateShowModalCallback: UpdateShowModalCallback | undefined;
/** Установка функции обновления видимости модального окна */
function setUpdateShowModalCallback(callback: UpdateShowModalCallback) {
  updateShowModalCallback = callback;

  window["updateShowModalCallback"] = updateShowModalCallback; // DEBUG ONLY
  updateShowModalCallback(true); // DEBUG ONLY
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

  setUpdateSearchDataCallback,
  setUpdateShowModalCallback
};
