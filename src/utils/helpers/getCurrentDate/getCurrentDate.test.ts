import { getCurrentDate } from "./getCurrentDate";

describe("getCurrentDate", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should return the current date in YYYY-MM-DD format", () => {
    const mockDate = new Date("2025-01-17T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const currentDate = getCurrentDate();

    expect(currentDate).toBe("2025-01-17");
  });

  it("should handle single-digit months and days correctly", () => {
    const mockDate = new Date("2025-02-05T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const currentDate = getCurrentDate();

    expect(currentDate).toBe("2025-02-05");
  });

  it("should work with leap years", () => {
    const mockDate = new Date("2024-02-29T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const currentDate = getCurrentDate();

    expect(currentDate).toBe("2024-02-29");
  });
});
