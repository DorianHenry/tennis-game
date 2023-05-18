import { describe, expect, it } from "vitest";
import { hasAtLeastTwoDifference } from "../functions/numbers";

describe("numbers helpers", () => {
  it("should calculate if has at least two difference between two numbers", () => {
    expect(hasAtLeastTwoDifference(6, 6)).toBe(false);
    expect(hasAtLeastTwoDifference(5, 6)).toBe(false);
    expect(hasAtLeastTwoDifference(6, 8)).toBe(true);
  });
});
