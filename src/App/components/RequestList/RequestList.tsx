import React, { useEffect, useState, useCallback } from 'react'
import CustomList from '../../../UIKit/CustomList/CustomList'
import { ItemData, ListColumnData } from '../../../UIKit/CustomList/CustomListTypes'
import { RequestListData } from '../../shared/types'
import { FetchData } from '../../../UIKit/CustomList/CustomListTypes.ts'
import Scripts from '../../shared/utils/clientScripts'
import CustomInput from '../../../UIKit/CustomInput/CustomInput'
import SliderPanel from '../SliderPanel/SliderPanel'
import { redirectSPA } from '../../shared/utils/utils'

/** Список застрахованных */
export default function RequestList() {
	// Поисковый запрос
	const [searchQuery, setSearchQuery] = useState<string>('')
	//Состояние слайдера
	const [sliderActive, setSliderActive] = useState(false)

	/** Колонки списка */
	const columns = [
		new ListColumnData({
			name: 'Номер',
			code: 'number',
			fr: 1,
			isSortable: true,
			isLink: true,
		}),
		new ListColumnData({
			name: 'Дата создания',
			code: 'createdAt',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Канал', code: 'channel', fr: 1, isSortable: true }),
		new ListColumnData({ name: 'Тема обращения', code: 'topic', fr: 1, isSortable: true }),
		new ListColumnData({
			name: 'Статус',
			code: 'statusRequest',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Причина обращения', code: 'reason', fr: 1, isSortable: true }),
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
				<SliderPanel
					title="Закрытые обращения"
					isVisible={sliderActive}
					setIsVisible={setSliderActive}
				/>
			</div>
			<div className="insured-list__list">
				<CustomList<undefined, RequestListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getRequestList}
				/>
			</div>
		</div>
	)
}
