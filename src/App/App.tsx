import React from "react";
import ModalDuplicate from "./components/ModalDuplicate/ModalDuplicate";
import { ModalDuplicateMode } from "./shared/types";
import ModalDuplicateWrapper from "./components/ModalDuplicate/ModalDuplicateWrapper";

export default function App() {
  // return <ModalDuplicateWrapper modalMode={ModalDuplicateMode.insured} />;
  return <ModalDuplicateWrapper modalMode={ModalDuplicateMode.applicant} />;
}
