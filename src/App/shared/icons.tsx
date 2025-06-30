import React from 'react'

const ReturnButton = (
	<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="21" cy="21" r="21" fill="#ECEFF1"></circle>
		<line
			x1="23.5507"
			y1="28.4649"
			x2="16.0341"
			y2="20.9483"
			stroke="#9EA3A8"
			stroke-width="2"
		></line>
		<line
			x1="23.7071"
			y1="14.7071"
			x2="16.7071"
			y2="21.7071"
			stroke="#9EA3A8"
			stroke-width="2"
		></line>
	</svg>
)
const EditButton = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15 5.9997L18 8.9997M13 19.9997H21M5 15.9997L4 19.9997L8 18.9997L19.586 7.4137C19.9609 7.03864 20.1716 6.53003 20.1716 5.9997C20.1716 5.46937 19.9609 4.96075 19.586 4.5857L19.414 4.4137C19.0389 4.03876 18.5303 3.82812 18 3.82812C17.4697 3.82813 16.9611 4.03876 16.586 4.4137L5 15.9997Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const IntegrationButton = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M15 9V5C15 3.89543 14.1046 3 13 3H5C3.89543 3 3 3.89543 3 5V13C3 14.1046 3.89543 15 5 15H9M12 15H13C14.1046 15 15 14.1046 15 13V12"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12 9H11C9.89543 9 9 9.89543 9 11V12M15 9H19C20.1046 9 21 9.89543 21 11V19C21 20.1046 20.1046 21 19 21H11C9.89543 21 9 20.1046 9 19V18V15"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)
const StatusAtWork = (
	<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="8.33398" cy="8" r="8" fill="#3F51B5" />
	</svg>
)
const StatusQueue = (
	<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="8.33398" cy="8" r="8" fill="#AFDF0A" />
	</svg>
)

const StatusFinished = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M20.4571 6.04289C20.8476 6.43342 20.8476 7.06658 20.4571 7.45711L9.70711 18.2071C9.31658 18.5976 8.68342 18.5976 8.29289 18.2071L4.29289 14.2071C3.90237 13.8166 3.90237 13.1834 4.29289 12.7929C4.68342 12.4024 5.31658 12.4024 5.70711 12.7929L9 16.0858L19.0429 6.04289C19.4334 5.65237 20.0666 5.65237 20.4571 6.04289Z"
			fill="#00B862"
		/>
	</svg>
)
export default {
	/** Кнопка назад */
	ReturnButton,
	/** Кнопка редактировать */
	EditButton,
	IntegrationButton,

	StatusAtWork,
	StatusQueue,

	StatusFinished,
}
