import {
  MyItemData,
  ItemDataString,
  ItemDataStringArray,
} from "../../UIKit/CustomList/CustomListTypes";

export interface IInputData<DataType = any> {
  value: string;
  data?: DataType;
}

export class ContractorListData {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: MyItemData<boolean>;
  /** ФИО  */
  fullname?: MyItemData<string>;
  /** Тип контрагента */
  type?: ItemDataString;
  /** Телефон */
  phone?: ItemDataString;
  /** Email */
  email?: ItemDataString;

  constructor({
    id,
    isIntegration,
    fullname,
    type,
    phone,
    email,
  }: ContractorListData) {
    this.id = id;
    this.isIntegration = isIntegration;
    this.fullname = fullname;
    this.type = type;
    this.phone = phone;
    this.email = email;
  }
}

export class InsuredListDataDeduplication {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: MyItemData<boolean>;
  /** ФИО застрахованного */
  fullname?: MyItemData<string>;
  /** Дата рождения */
  birthdate?: ItemDataString;
  /** Телефон */
  phone?: ItemDataString;
  /** Email */
  email?: ItemDataString;
  /** Статус */
  statusContragent?: MyItemData;
  /** Полис */
  policy?: ItemDataStringArray;
  /** Дата начала действия полиса */
  policyStartDate?: ItemDataStringArray;
  /** Дата окончания действия полиса */
  policyEndDate?: ItemDataStringArray;
  /** Страхователь */
  insurer?: ItemDataString;
  /** Продукт */
  product?: ItemDataString;

  constructor({
    id,
    isIntegration,
    fullname,
    birthdate,
    phone,
    email,
    statusContragent,
    policy,
    policyStartDate,
    policyEndDate,
    insurer,
    product,
  }: InsuredListDataDeduplication) {
    this.id = id;
    this.isIntegration = isIntegration;
    this.fullname = fullname;
    this.birthdate = birthdate;
    this.phone = phone;
    this.email = email;
    this.statusContragent = statusContragent;
    this.policy = policy;
    this.policyStartDate = policyStartDate;
    this.policyEndDate = policyEndDate;
    this.insurer = insurer;
    this.product = product;
  }
}

export class RequestListData {
  id: ItemDataString;
  /** Номер */
  number?: MyItemData;
  /** Дата создания  */
  createdAt?: ItemDataString;
  /** Канал */
  channel?: ItemDataString;
  /** Тема обращения */
  topic?: ItemDataString;
  /** Статус */
  statusRequest?: MyItemData;
  /** Причина обращения */
  reason?: ItemDataString;
  isOpen?: MyItemData;

  constructor({
    id,
    number,
    createdAt,
    channel,
    topic,
    statusRequest,
    reason,
  }: RequestListData) {
    this.id = id;
    this.number = number;
    this.createdAt = createdAt;
    this.channel = channel;
    this.topic = topic;
    this.statusRequest = statusRequest;
    this.reason = reason;
  }
}

export class TaskListData {
  id: ItemDataString;
  /** Номер */
  number?: ItemDataString;
  /** Дата создания  */
  createdAt?: ItemDataString;
  /** Тип задачи  */
  type?: ItemDataString;
  /** Вид задачи */
  sort?: ItemDataString;
  /** Статус задачи */
  statusTask?: MyItemData;
  /** Форма согласования */
  formApproval?: ItemDataString;
  /** Статус согласования */
  statusApproval?: MyItemData;
  /** Описание задачи */
  description?: ItemDataString;
  isOpen?: MyItemData;

  constructor({
    id,
    number,
    createdAt,
    type,
    sort,
    statusTask,
    formApproval,
    statusApproval,
    description,
  }: TaskListData) {
    this.id = id;
    this.number = number;
    this.createdAt = createdAt;
    this.type = type;
    this.sort = sort;
    this.statusTask = statusTask;
    this.formApproval = formApproval;
    this.statusApproval = statusApproval;
    this.description = description;
  }
}

/** Данные поиска дубликатов контрагента */
export interface ContractorsSearchData {
  /** ФИО */
  fullname?: string;
  /** email */
  email?: string;
  /** Телефон */
  phone?: string;
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string;
  /** Идентификаторы выбранных контрагентов */
  contractorsIds?: string[];
}

/** Реэжим формы дедубликации */
export enum ModalDuplicateMode {
  /** Обратившийся */
  applicant = "applicant",
  /** Застрахованный */
  insured = "insured",
}
