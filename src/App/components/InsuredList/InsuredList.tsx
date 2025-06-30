import React, { useEffect, useState } from 'react'
import CustomList from '../../../UIKit/CustomList/CustomList'
import { ItemData, ListColumnData } from '../../../UIKit/CustomList/CustomListTypes'
import { InsuredListData } from '../../shared/types'
import Scripts from '../../shared/utils/clientScripts'
import CustomInput from '../../../UIKit/CustomInput/CustomInput'
import { redirectSPA } from '../../shared/utils/utils'

/** Список застрахованных */
export default function InsuredList() {
	// Поисковый запрос
	const [searchQuery, setSearchQuery] = useState<string>('')
	/** Колонки списка */
	const columns = [
		new ListColumnData({
			name: 'ФИО',
			code: 'fullname',
			fr: 1,
			isSortable: true,
			isLink: true,
		}),
		new ListColumnData({
			name: 'Дата рождения',
			code: 'birthdate',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Телефон', code: 'phone', fr: 1, isSortable: true }),
		new ListColumnData({ name: 'Email', code: 'email', fr: 1, isSortable: true }),
		new ListColumnData({
			name: 'Статус',
			code: 'statusContragent',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Полис', code: 'policy', fr: 1, isSortable: true }),
		new ListColumnData({
			name: 'Начало действия',
			code: 'policyStartDate',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({
			name: 'Окончание действия',
			code: 'policyEndDate',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({
			name: 'Страхователь',
			code: 'insurer',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({
			name: 'Продукт',
			code: 'product',
			fr: 1,
			isSortable: true,
		}),
	]

	return (
		<div className="insured-list">
			<div className="insured-list__search">
				{/* Поле поиска */}
				<CustomInput
					value={searchQuery}
					setValue={setSearchQuery}
					cursor="text"
					placeholder="Поиск"
				/>
			</div>
			<div className="insured-list__list">
				<CustomList<undefined, InsuredListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getInsuredList}
				/>
			</div>
		</div>
	)
}
