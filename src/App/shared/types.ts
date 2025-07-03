import {
  ItemData,
  ItemDataString,
} from "../../UIKit/CustomList/CustomListTypes";

export interface IInputData<DataType = any> {
  value: string;
  data?: DataType;
}

export class ContractorListData {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: ItemData<boolean>;
  /** ФИО  */
  fullname?: ItemDataString;
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

export class InsuredListData {
  id?: ItemDataString;
  /** Получен по интеграции? */
  isIntegration?: ItemData<boolean>;
  /** ФИО застрахованного */
  fullname?: ItemDataString;
  /** Дата рождения */
  birthdate?: ItemDataString;
  /** Телефон */
  phone?: ItemDataString;
  /** Email */
  email?: ItemDataString;
  /** Статус */
  statusContragent?: ItemData;
  /** Полис */
  policy?: ItemDataString;
  /** Дата начала действия полиса */
  policyStartDate?: ItemDataString;
  /** Дата окончания действия полиса */
  policyEndDate?: ItemDataString;
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
  }: InsuredListData) {
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
  number?: ItemDataString;
  /** Дата создания  */
  createdAt?: ItemDataString;
  /** Канал */
  channel?: ItemDataString;
  /** Тема обращения */
  topic?: ItemDataString;
  /** Статус */
  statusRequest?: ItemData;
  /** Причина обращения */
  reason?: ItemDataString;
  isOpen?: ItemData;

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
  statusTask?: ItemData;
  /** Форма согласования */
  formApproval?: ItemDataString;
  /** Статус согласования */
  statusApproval?: ItemData;
  /** Описание задачи */
  description?: ItemDataString;
  isOpen?: ItemData;

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
  fullname?: string,
  /** email */
  email?: string,
  /** Телефон */
  phone?: string
}

/** Данные поиска дубликатов контрагента (с дополнительными полями) */
export interface ContractorsSearchDataExtended extends ContractorsSearchData {
  /** Данные поисковой строки */
  searchQuery?: string,
  /** Идентификаторы выбранных контрагентов */
  contractorsIds?: string[]
}

/** Реэжим формы дедубликации */
export enum ModalDuplicateMode {
  /** Обратившийся */
  applicant = "applicant",
  /** Застрахованный */
  insured = "insured"
}
