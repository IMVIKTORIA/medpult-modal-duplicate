import React, { useEffect, useState } from 'react'
import CustomList from '../../../UIKit/CustomList/CustomList'
import { ItemData, ListColumnData } from '../../../UIKit/CustomList/CustomListTypes'
import { ContractorListData } from '../../shared/types'
import Scripts from '../../shared/utils/clientScripts'
import { redirectSPA } from '../../shared/utils/utils'
import CustomInput from '../../../UIKit/CustomInput/CustomInput'
import Button from '../../../UIKit/Button/Button'
import icons from '../../shared/icons'

/** Список застрахованных */
export default function ContractorList() {
	// Поисковый запрос
	const [searchQuery, setSearchQuery] = useState<string>('')
	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: '', code: 'isIntegration', fr: 0.2, isIcon: true }),
		new ListColumnData({
			name: 'ФИО',
			code: 'fullname',
			fr: 1,
			isSortable: true,
			isLink: true,
		}),
		new ListColumnData({
			name: 'Тип контрагента',
			code: 'type',
			fr: 1,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Телефон', code: 'phone', fr: 1, isSortable: true }),
		new ListColumnData({ name: 'Email', code: 'email', fr: 1, isSortable: true }),
	]

	/** Идентификаторы выбранных контрагентов */
	const [selectedContractorsIds, setSelectedContractorsIds] = useState<string[]>([])
	useEffect(() => console.log(selectedContractorsIds), [selectedContractorsIds])

	return (
		<div className="contractor-list">
			<div className="contractor-list__search">
				{/* Поле поиска */}
				<CustomInput
					value={searchQuery}
					setValue={setSearchQuery}
					cursor="text"
					placeholder="Поиск"
				/>
				<div className="contractor-list__search__button">
					<Button title={'Выбрать'} clickHandler={''}></Button>
					<Button
						title={'Oставить без измений'}
						clickHandler={''}
						style={{ backgroundColor: '#FF4545' }}
					></Button>
				</div>
				<Button
					title={'Редактировать'}
					clickHandler={''}
					icon={icons.EditButton}
					style={{ backgroundColor: '#fff', color: '#6B6C6F' }}
				></Button>
			</div>
			<div className="contractor-list__list">
				<CustomList<undefined, ContractorListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getContractorList}
					isSelectable={true}
					isMultipleSelect={false}
					setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
					selectedItems={selectedContractorsIds}
				/>
			</div>
		</div>
	)
}
