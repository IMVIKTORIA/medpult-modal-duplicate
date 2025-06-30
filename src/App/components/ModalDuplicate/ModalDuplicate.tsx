import React, { useEffect, useState } from 'react'
import Button from '../../../UIKit/Button/Button'
import TabsWrapper from '../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx'
import TabItem from '../../../UIKit/Tabs/TabItem/TabItem.tsx'
import ModalWrapper from './ModalWrapper/ModalWrapper'
import InsuredList from '../InsuredList/InsuredList'
import ContragentList from '../ContractorList/ContractorList.tsx'
import RequestList from '../RequestList/RequestList.tsx'
import TaskList from '../TaskList/TaskList.tsx'
import Scripts from '../../shared/utils/clientScripts'

/** Универсальное модальное окно */
export default function ModalDuplicate() {
	//количество застрахованных
	const [elementsCount, setElementsCount] = useState<number>(0)
	const fetchElementsCount = async () => {
		const count = 10
		setElementsCount(count)
	}
	// Вычислить количество застрахованных
	useEffect(() => {
		fetchElementsCount()
	}, [])

	return (
		<ModalWrapper>
			<div className="duplicate-modal">
				<div className="duplicate-modal__header">
					<span className="duplicate-modal__label">Возможные дубли обратившегося</span>
				</div>
				<div className="duplicate-modal__content">
					<TabsWrapper>
						<TabItem
							code={'requestContragen'}
							name={`Обратившиеся (${elementsCount} из ${elementsCount})`}
						>
							<ContragentList />
						</TabItem>
						<TabItem
							code={'insuredContragen'}
							name={`Застрахованные (${elementsCount} из ${elementsCount})`}
						>
							<InsuredList />
						</TabItem>
						<TabItem code={'requests'} name={`Обращения (${elementsCount} из ${elementsCount})`}>
							<RequestList />
						</TabItem>
						<TabItem code={'tasks'} name={`Задачи (${elementsCount} из ${elementsCount})`}>
							<TaskList />
						</TabItem>
					</TabsWrapper>
				</div>
			</div>
		</ModalWrapper>
	)
}
