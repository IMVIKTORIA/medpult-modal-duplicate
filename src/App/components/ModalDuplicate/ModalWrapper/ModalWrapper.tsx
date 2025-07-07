import React from "react";
import { ModalDuplicateMode } from "../../../shared/types";

type ModalWrapperProps = {
  children: React.ReactNode;
  modalMode: ModalDuplicateMode;
};
/** Обертка модального окна */
export default function ModalWrapper({
  children,
  modalMode,
}: ModalWrapperProps) {
  return (
    <div
      className="modal-wrapper"
      style={{
        paddingLeft: modalMode === ModalDuplicateMode.insured ? "38%" : "20px",
      }}
    >
      {children}
    </div>
  );
}
