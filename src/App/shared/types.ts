import { ItemData, ItemDataString } from '../../UIKit/CustomList/CustomListTypes'

export interface IInputData<DataType = any> {
	value: string
	data?: DataType
}

export class ContractorListData {
	/** Получен по интеграции? */
	isIntegration?: ItemData
	/** ФИО  */
	fullname?: ItemData
	/** Тип контрагента */
	type?: ItemData
	/** Телефон */
	phone?: ItemData
	/** Email */
	email?: ItemData

	constructor({ isIntegration, fullname, type, phone, email }: ContractorListData) {
		this.isIntegration = isIntegration
		this.fullname = fullname
		this.type = type
		this.phone = phone
		this.email = email
	}
}

export class InsuredListData {
	/** ФИО застрахованного */
	fullname?: ItemData
	/** Дата рождения */
	birthdate?: ItemData
	/** Телефон */
	phone?: ItemData
	/** Email */
	email?: ItemData
	/** Статус */
	statusContragent?: ItemData
	/** Полис */
	policy?: ItemData
	/** Дата начала действия полиса */
	policyStartDate?: ItemData
	/** Дата окончания действия полиса */
	policyEndDate?: ItemData
	/** Страхователь */
	insurer?: ItemData
	/** Продукт */
	product?: ItemData

	constructor({
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
		this.fullname = fullname
		this.birthdate = birthdate
		this.phone = phone
		this.email = email
		this.statusContragent = statusContragent
		this.policy = policy
		this.policyStartDate = policyStartDate
		this.policyEndDate = policyEndDate
		this.insurer = insurer
		this.product = product
	}
}

export class RequestListData {
	/** Номер */
	number?: ItemData
	/** Дата создания  */
	createdAt?: ItemData
	/** Канал */
	channel?: ItemData
	/** Тема обращения */
	topic?: ItemData
	/** Статус */
	statusRequest?: ItemData
	/** Причина обращения */
	reason?: ItemData

	constructor({ number, createdAt, channel, topic, statusRequest, reason }: RequestListData) {
		this.number = number
		this.createdAt = createdAt
		this.channel = channel
		this.topic = topic
		this.statusRequest = statusRequest
		this.reason = reason
	}
}

export class TaskListData {
	/** Номер */
	number?: ItemData
	/** Дата создания  */
	createdAt?: ItemData
	/** Тип задачи  */
	type?: ItemData
	/** Вид задачи */
	sort?: ItemData
	/** Статус задачи */
	statusTask?: ItemData
	/** Форма согласования */
	formApproval?: ItemData
	/** Статус согласования */
	statusApproval?: ItemData

	constructor({
		number,
		createdAt,
		type,
		sort,
		statusTask,
		formApproval,
		statusApproval,
	}: TaskListData) {
		this.number = number
		this.createdAt = createdAt
		this.type = type
		this.sort = sort
		this.statusTask = statusTask
		this.formApproval = formApproval
		this.statusApproval = statusApproval
	}
}
