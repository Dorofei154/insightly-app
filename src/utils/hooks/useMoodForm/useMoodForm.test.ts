import { act, renderHook } from "@testing-library/react";
import { getCurrentDate } from "../../helpers/getCurrentDate/getCurrentDate";
import { useModal } from "../useModal/useModal";
import { useMood } from "../useMood/useMood";
import { useMoodForm } from "./useMoodForm";

jest.mock("../useMood/useMood");
jest.mock("../useModal/useModal");
jest.mock("../../helpers/getCurrentDate/getCurrentDate");

describe("useMoodForm", () => {
  const mockAddMood = jest.fn();
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    (useMood as jest.Mock).mockReturnValue({ addMood: mockAddMood });
    (useModal as jest.Mock).mockReturnValue({ closeModal: mockCloseModal });
    (getCurrentDate as jest.Mock).mockReturnValue("2025-01-18");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with currentMood set to 0", () => {
    const { result } = renderHook(() => useMoodForm());
    expect(result.current.currentMood).toBe(0);
  });

  it("should update currentMood when handleChange is called", () => {
    const { result } = renderHook(() => useMoodForm());

    act(() => {
      result.current.handleChange({
        target: { value: "3" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.currentMood).toBe(3);
  });
});
