import {
  FetchData,
  MyItemData,
  ItemDataString,
  ItemDataStringArray,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { formatPhone } from "../../../UIKit/shared/utils/utils";
import { InsuredSearchData } from "../../components/InsuredList/InsuredList";
import { RequestSearchData } from "../../components/RequestList/RequestList";
import { TaskSearchData } from "../../components/TaskList/TaskList";
import {
  ContractorListData,
  ContractorsSearchData,
  ContractorsSearchDataExtended,
  InsuredListDataDeduplication,
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
    isIntegration: new MyItemData({ value: "", info: true }),
    fullname: new MyItemData({
      value: "Иванов Иван Иванович",
      info: `${Math.random() * 10000}`,
    }),
    type: new ItemDataString("Физлицо"),
    // phone: new ItemDataString("79998887766"),
    // email: new ItemDataString("ivanov@mail.ru"),
    phone: [
      {
        value: formatPhone("79998887766"),
        isValid: Math.random() > 0.5,
      },
      {
        value: formatPhone("79991112244"),
        isValid: Math.random() > 0.5,
      },
    ],
    email: [
      {
        value: "ivanov@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "dmitriev@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "test@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "vladimirov@mail.ru",
        isValid: Math.random() > 0.5,
      },
    ],
  }),
  new ContractorListData({
    id: new ItemDataString("2"),
    isIntegration: new MyItemData({ value: "", info: false }),
    fullname: new MyItemData({
      value: "Петров Петр Петрович",
      info: `${Math.random() * 10000}`,
    }),
    type: new ItemDataString("Юрлицо"),
    // phone: new ItemDataString("77776665544"),
    // email: new ItemDataString("petrov@mail.ru"),
    phone: [
      {
        value: formatPhone("79998887766"),
        isValid: Math.random() > 0.5,
      },
      {
        value: formatPhone("79991112244"),
        isValid: Math.random() > 0.5,
      },
    ],
    email: [
      {
        value: "ivanov@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "dmitriev@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "test@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "vladimirov@mail.ru",
        isValid: Math.random() > 0.5,
      },
    ],
  }),
  new ContractorListData({
    id: new ItemDataString("3"),
    isIntegration: new MyItemData({ value: "", info: true }),
    fullname: new MyItemData({
      value: "Викторов Виктор Викторович",
      info: `${Math.random() * 10000}`,
    }),
    type: new ItemDataString("Юрлицо"),
    // phone: new ItemDataString("78886665544"),
    // email: new ItemDataString("viktor@mail.ru"),
    phone: [
      {
        value: formatPhone("79998887766"),
        isValid: Math.random() > 0.5,
      },
      {
        value: formatPhone("79991112244"),
        isValid: Math.random() > 0.5,
      },
    ],
    email: [
      {
        value: "ivanov@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "dmitriev@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "test@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "vladimirov@mail.ru",
        isValid: Math.random() > 0.5,
      },
    ],
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
async function getInsuredListDeduplication(
  page: number,
  sortData?: SortData,
  searchData?: InsuredSearchData
): Promise<FetchData<InsuredListDataDeduplication>> {
  await randomDelay();
  const mockData: InsuredListDataDeduplication = {
    isIntegration: new MyItemData({ value: "", info: true }),
    fullname: new MyItemData({
      value: "Иванов Иван Иванович",
      info: `${Math.round(Math.random() * 10000)}`,
    }),
    birthdate: { value: "10.10.1990", isValid: Math.random() > 0.5 },
    phone: [
      {
        value: formatPhone("79998887766"),
        isValid: Math.random() > 0.5,
      },
      {
        value: formatPhone("79991112244"),
        isValid: Math.random() > 0.5,
      },
    ],
    email: [
      {
        value: "ivanov@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "dmitriev@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "test@mail.ru",
        isValid: Math.random() > 0.5,
      },
      {
        value: "vladimirov@mail.ru",
        isValid: Math.random() > 0.5,
      },
    ],
    statusContragent: new MyItemData({ value: "Gold", info: "Gold" }),
    policy: [
      {
        value: "00SB755380849982/1",
        id: "00SB755380849982/1",
        isValid: Math.random() > 0.5,
      },
      {
        value: "00SB755380849982/2",
        id: "00SB755380849982/2",
        isValid: Math.random() > 0.5,
      },
      {
        value: "00SB755380849982/3",
        id: "00SB755380849982/3",
        isValid: Math.random() > 0.5,
      },
    ],
    policyStartDate: [
      {
        value: "20.01.2025",
        id: "00SB755380849982/1",
        isValid: Math.random() > 0.5,
      },
      {
        value: "22.01.2025",
        id: "00SB755380849982/2",
        isValid: Math.random() > 0.5,
      },
      {
        value: "24.01.2025",
        id: "00SB755380849982/3",
        isValid: Math.random() > 0.5,
      },
    ],
    policyEndDate: [
      {
        value: "20.01.2024",
        id: "00SB755380849982/1",
        isValid: Math.random() > 0.5,
      },
      {
        value: "22.01.2024",
        id: "00SB755380849982/2",
        isValid: Math.random() > 0.5,
      },
      {
        value: "24.01.2024",
        id: "00SB755380849982/3",
        isValid: Math.random() > 0.5,
      },
    ],
    insurer: [
      {
        value: "Петров Петр Петрович",
        id: "Петров Петр Петрович",
        isValid: Math.random() > 0.5,
      },
      {
        value: "Иванов Иван Иванович",
        id: "Иванов Иван Иванович",
        isValid: Math.random() > 0.5,
      },
      {
        value: "Владимиров Владимир Владимирович",
        id: "Владимиров Владимир Владимирович",
        isValid: Math.random() > 0.5,
      },
    ],
    product: [
      {
        value: "ДМС макси прочее",
        id: "ДМС макси прочее",
        isValid: Math.random() > 0.5,
      },
      {
        value: "",
        isValid: Math.random() > 0.5,
      },
      {
        value: "Клещ ПРО",
        id: "Клещ ПРО",
        isValid: Math.random() > 0.5,
      },
    ],
  };

  return {
    items: Array(20)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new InsuredListDataDeduplication(mockData),
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
        number: new MyItemData({
          value: `RW00000${index}/24`,
          info: `id__${index}`,
        }),
        createdAt: new ItemDataString("01.01.1990 14:17"),
        channel: new ItemDataString("Телефон"),
        topic: new ItemDataString(
          "Согласование медицинских услуг Согласование медицинских услуг Согласование медицинских услуг"
        ),
        statusRequest: new MyItemData({
          value: status.value,
          info: status.info,
        }),
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
        number: new MyItemData({ value: `TS00000${index}/24`, info: "" }),
        createdAt: new ItemDataString("01.01.1990 14:17"),
        type: new ItemDataString("Медицинское"),
        sort: new ItemDataString("Запись к врачу"),
        statusTask: new MyItemData({
          value: statusTask.value,
          info: statusTask.info,
        }),
        formApproval: new ItemDataString("Устное"),
        statusApproval: new MyItemData({
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
async function getCountConractor(searchData: ContractorsSearchData) {
  return 4;
}
/** Получить количество застрахованных*/
async function getCountInsured(searchData: ContractorsSearchData) {
  return 10;
}
/** Получить количество обращений*/
async function getCountRequest(searchData: ContractorsSearchData) {
  return 4;
}
/** Получить количество задач*/
async function getCountTask(searchData: ContractorsSearchData) {
  return 10;
}

declare const Context: any;

/** Получение кода страницы Обращение */
function getRequestPagePath(): string {
  return "Context.data.request_page_path";
}
async function getRequestIdByTaskId(taskId: string): Promise<string> {
  return "test";
}

/** Получение кода страницы Контрагента */
function getContractorPageCode(): string {
  // return "contractor";
  return "";
}

type UpdateSearchDataCallback = (searchData: ContractorsSearchData) => void;
/** Функция обновления данных поиска контрагента */
let updateSearchDataCallback: UpdateSearchDataCallback | undefined;
/** Установка функции обновления данных поиска контрагента */
function setUpdateSearchDataCallback(callback: UpdateSearchDataCallback) {
  updateSearchDataCallback = callback;
  window["updateSearchDataCallback"] = callback; // DEBUG ONLY
}

type UpdateShowModalCallback = (isShowModal: boolean) => void;
/** Функция обновления видимости модального окна */
let updateShowModalCallback: UpdateShowModalCallback | undefined;
/** Установка функции обновления видимости модального окна */
function setUpdateShowModalCallback(callback: UpdateShowModalCallback) {
  updateShowModalCallback = callback;

  window["updateShowModalCallback"] = updateShowModalCallback; // DEBUG ONLY
  updateShowModalCallback(true); // DEBUG ONLY
}

/** Закрыть модальное окно дедубликации */
function closeDeduplicationModal() {
  // TODO: Логика
}

/** Запустить стандартную логику сохранения */
function runCommonSave() {
  // TODO: Логика
}

/** Запустить логику сохранения с выбранным контрагентом */
function runSaveWithInsured(insuredIds: string[]) {
  // TODO: Логика
}

/** Получить количество отфильтрованных обращений по выбранному Застрахованному */
async function getFilteredRequestsCount(
  insuredIds: string[],
  contractorsSearchData: ContractorsSearchData,
  isShowClosed: boolean
) {
  // TODO: Логика
  return Math.floor(Math.random() * 10);
}
/** Получить количество отфильтрованных задач по выбранному обращению */
async function getFilteredTasksCount(
  requestsIds: string[],
  contractorsSearchData: ContractorsSearchData,
  isShowClosed: boolean
) {
  // TODO: Логика
  return Math.floor(Math.random() * 10);
}

/** Получить количество отфильтрованных застрахованных по выбранному обратившемуся */
async function getFilteredInsuredCount(
  contractorsIds: string[],
  contractorsSearchData: ContractorsSearchData
) {
  // TODO: Логика
  return Math.floor(Math.random() * 10);
}

export default {
  getContractorList,
  getInsuredListDeduplication,
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
  setUpdateShowModalCallback,

  closeDeduplicationModal,
  runCommonSave,
  runSaveWithInsured,

  getFilteredRequestsCount,

  getFilteredInsuredCount,
  getFilteredTasksCount,
};
