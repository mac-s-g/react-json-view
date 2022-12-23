import { cleanup } from "@testing-library/react-hooks";

import parseInput from "@/js/helpers/parseInput";

describe("parseInput", () => {
  afterEach(() => {
    cleanup();
  });
  it("parseInput array", () => {
    expect(parseInput(JSON.stringify([1, 2, "test"])).type).toBe("array");
  });

  it("parseInput object", () => {
    expect(parseInput(JSON.stringify({ test: true })).type).toBe("object");
  });

  it("parseInput number", () => {
    expect(parseInput("22").type).toBe("number");
  });

  it("parseInput decimal number", () => {
    expect(parseInput("5.22").type).toBe("number");
  });

  it("parseInput small decimal number", () => {
    expect(parseInput("0.0000002").type).toBe("number");
  });

  it("parseInput scientific notation very small number", () => {
    expect(parseInput("2e-7").type).toBe("number");
  });

  it("parseInput scientific notation very large number", () => {
    expect(parseInput("4e+8").type).toBe("number");
  });

  it("parseInput null", () => {
    expect(parseInput("nUlL").type).toBe("null");
  });

  it("parseInput boolean", () => {
    expect(parseInput("true").type).toBe("boolean");

    expect(parseInput("false").type).toBe("boolean");
  });

  it("parseInput string", () => {
    expect(parseInput("test").type).toBe("string");
  });
});
