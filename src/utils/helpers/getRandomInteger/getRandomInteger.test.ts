import { getRandomInteger } from "./getRandomInteger";

describe("getRandomInteger", () => {
  it("should return a number between the default range (1 to 10)", () => {
    const randomValue = getRandomInteger();
    expect(randomValue).toBeGreaterThanOrEqual(1);
    expect(randomValue).toBeLessThanOrEqual(10);
  });

  it("should return a number between a specified range", () => {
    const min = 5;
    const max = 15;
    const randomValue = getRandomInteger(min, max);
    expect(randomValue).toBeGreaterThanOrEqual(min);
    expect(randomValue).toBeLessThanOrEqual(max);
  });

  it("should return the min value when min and max are the same", () => {
    const min = 7;
    const max = 7;
    const randomValue = getRandomInteger(min, max);
    expect(randomValue).toBe(min);
  });

  it("should return consistent random numbers when Math.random is mocked", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const randomValue = getRandomInteger(1, 10);
    expect(randomValue).toBe(6);
    jest.restoreAllMocks();
  });
});
