import { fireEvent, render, screen } from "@testing-library/react";
import { PORTAL_IDS } from "../../constants/portalIds";
import { useModal } from "../../utils/hooks";
import Modal from "./Modal";

jest.mock("../../utils/hooks");

describe("Modal Component", () => {
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = `<div id="${PORTAL_IDS.modal}"></div>`; // Создаём корневой элемент для портала
    (useModal as jest.Mock).mockReturnValue({
      isModalOpen: true,
      closeModal: mockCloseModal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal when isModalOpen is true", () => {
    render(
      <Modal>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render the modal when isModalOpen is false", () => {
    (useModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      closeModal: mockCloseModal,
    });

    render(
      <Modal>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close the modal when Escape key is pressed", () => {
    render(
      <Modal>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("should not close the modal when clicking inside the modal content", () => {
    render(
      <Modal>
        <p>Modal Content</p>
      </Modal>
    );

    const modalContent = screen.getByText("Modal Content");
    fireEvent.click(modalContent);

    expect(mockCloseModal).not.toHaveBeenCalled();
  });
});
