import React from "react";
import ModalDuplicate from "./components/ModalDuplicate/ModalDuplicate";
import { ModalDuplicateMode } from "./shared/types";
import ModalDuplicateWrapper from "./components/ModalDuplicate/ModalDuplicateWrapper";

export default function App() {
  // Для формы обращения
  return <ModalDuplicateWrapper modalMode={ModalDuplicateMode.insured} />;
  // Для формы контрагента
  // return <ModalDuplicateWrapper modalMode={ModalDuplicateMode.applicant} />;
}
