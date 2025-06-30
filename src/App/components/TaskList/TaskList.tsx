import React, { useEffect, useState } from 'react'
import CustomList from '../../../UIKit/CustomList/CustomList'
import { ItemData, ListColumnData } from '../../../UIKit/CustomList/CustomListTypes'
import { TaskListData } from '../../shared/types'
import Scripts from '../../shared/utils/clientScripts'
import CustomInput from '../../../UIKit/CustomInput/CustomInput'
import SliderPanel from '../SliderPanel/SliderPanel'
import { redirectSPA } from '../../shared/utils/utils'

/** Список застрахованных */
export default function TaskList() {
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
		new ListColumnData({ name: 'Тип задачи', code: 'type', fr: 1, isSortable: true }),
		new ListColumnData({ name: 'Вид задачи', code: 'sort', fr: 1, isSortable: true }),
		new ListColumnData({
			name: 'Статус',
			code: 'statusTask',
			fr: 1,
			isSortable: true,
			isIcon: true,
		}),
		new ListColumnData({
			name: 'Форма согласования',
			code: 'formApproval',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({
			name: 'Статус согласования',
			code: 'statusApproval',
			fr: 1,
			isSortable: true,
			isIcon: true,
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
				<SliderPanel
					title="Закрытые задачи"
					isVisible={sliderActive}
					setIsVisible={setSliderActive}
				/>
			</div>
			<div className="insured-list__list">
				<CustomList<undefined, TaskListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getTaskList}
				/>
			</div>
		</div>
	)
}
