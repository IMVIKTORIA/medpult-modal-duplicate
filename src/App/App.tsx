import React from 'react'
import ModalDuplicate from './components/ModalDuplicate/ModalDuplicate'
import { ModalDuplicateMode } from './shared/types'

export default function App() {
	return <ModalDuplicate modalMode={ModalDuplicateMode.insured}/>
	// return <ModalDuplicate modalMode={ModalDuplicateMode.applicant}/>
}
