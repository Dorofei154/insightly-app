import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";
import { ModalContext } from "../../../contexts/ModalContext/ModalContext";
import { ModalContextState } from "../../../interfaces/ModalContextState";
import { useModal } from "./useModal";

describe("useModal", () => {
  const mockContextValue: ModalContextState = {
    isModalOpen: true,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ModalContext.Provider value={mockContextValue}>
      {children}
    </ModalContext.Provider>
  );

  it("should return context when used within a ModalProvider", () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
    expect(result.current.isModalOpen).toBe(true);
  });

  it("should throw an error when used outside of ModalProvider", () => {
    const { result } = renderHook(() => useModal());

    expect(result.error).toEqual(
      new Error("useModal must be used within a ModalProvider")
    );
  });
});
