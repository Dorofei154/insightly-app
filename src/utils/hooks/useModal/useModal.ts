import { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext/ModalContext";
import { ModalContextState } from "../../../interfaces/ModalContextState";

export const useModal = () => {
  const context = useContext<ModalContextState | undefined>(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
