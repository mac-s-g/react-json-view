import { cleanup } from "@testing-library/react-hooks";

import stringifyVariable from "@/js/helpers/stringifyVariable";

describe("stringifyVariable", () => {
  afterEach(() => {
    cleanup();
  });
  it("stringifyVariable integers", () => {
    let test = 5;
    expect(stringifyVariable(test)).toBe("5");

    test = -15;
    expect(stringifyVariable(test)).toBe("-15");

    test = 0;
    expect(stringifyVariable(test)).toBe("0");

    test = 1.123;
    expect(stringifyVariable(test)).toBe("1.123");

    test = -10.123;
    expect(stringifyVariable(test)).toBe("-10.123");
  });

  it("stringifyVariable booleans", () => {
    let test = true;
    expect(stringifyVariable(test)).toBe("true");

    test = false;
    expect(stringifyVariable(test)).toBe("false");
  });

  it("stringifyVariable NaN", () => {
    const test = NaN;
    expect(stringifyVariable(test)).toBe("NaN");
  });

  it("stringifyVariable null", () => {
    const test = null;
    expect(stringifyVariable(test)).toBe("null");
  });

  it("stringifyVariable strings", () => {
    let test = "test string";
    expect(stringifyVariable(test)).toBe("test string");

    test = "";
    expect(stringifyVariable(test)).toBe("");
  });
});
