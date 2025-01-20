import { createContext } from "react";
import { ModalContextState } from "../../interfaces/ModalContextState";

export const ModalContext = createContext<ModalContextState | undefined>(
  undefined
);
