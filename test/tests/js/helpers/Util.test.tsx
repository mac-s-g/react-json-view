import { cleanup } from "@testing-library/react-hooks";

import { isTheme, toType } from "@/js/helpers/util";

describe("toType", () => {
  afterEach(() => {
    cleanup();
  });

  it("toType object", () => {
    const test = { a: true };
    expect(toType(test)).toBe("object");
  });

  it("toType string", () => {
    const test = "test";
    expect(toType(test)).toBe("string");
  });

  it("toType boolean", () => {
    const test = false;
    expect(toType(test)).toBe("boolean");
  });

  it("toType number", () => {
    let test = 5;
    expect(toType(test)).toBe("number");
    test = -3.14156;
    expect(toType(test)).toBe("number");
    test = NaN;
    expect(toType(test)).toBe("number");
  });

  it("toType null", () => {
    const test = null;
    expect(toType(test)).toBe("null");
  });
});

describe("isTheme", () => {
  it("isTheme valid theme", () => {
    const test = {
      scheme: "rjv-grey",
      author: "mac gainor",
      base00: "rgba(1, 1, 1, 0)",
      base01: "rgba(1, 1, 1, 0.1)",
      base02: "rgba(0, 0, 0, 0.2)",
      base03: "rgba(1, 1, 1, 0.3)",
      base04: "rgba(0, 0, 0, 0.4)",
      base05: "rgba(1, 1, 1, 0.5)",
      base06: "rgba(1, 1, 1, 0.6)",
      base07: "rgba(1, 1, 1, 0.7)",
      base08: "rgba(1, 1, 1, 0.8)",
      base09: "rgba(1, 1, 1, 0.8)",
      base0A: "rgba(1, 1, 1, 0.8)",
      base0B: "rgba(1, 1, 1, 0.8)",
      base0C: "rgba(1, 1, 1, 0.8)",
      base0D: "rgba(1, 1, 1, 0.8)",
      base0E: "rgba(1, 1, 1, 0.8)",
      base0F: "rgba(1, 1, 1, 0.8)",
    };
    expect(isTheme(test)).toBe(true);
  });

  it("isTheme invalid theme", () => {
    const test = {
      scheme: "rjv-grey",
      author: "mac gainor",
      base00: "rgba(1, 1, 1, 0)",
      base01: "rgba(1, 1, 1, 0.1)",
      base02: "rgba(0, 0, 0, 0.2)",
      base03: "rgba(1, 1, 1, 0.3)",
      base04: "rgba(0, 0, 0, 0.4)",
      base05: "rgba(1, 1, 1, 0.5)",
      base06: "rgba(1, 1, 1, 0.6)",
      base08: "rgba(1, 1, 1, 0.8)",
      base09: "rgba(1, 1, 1, 0.8)",
      base0A: "rgba(1, 1, 1, 0.8)",
      base0B: "rgba(1, 1, 1, 0.8)",
      base0C: "rgba(1, 1, 1, 0.8)",
      base0D: "rgba(1, 1, 1, 0.8)",
      base0E: "rgba(1, 1, 1, 0.8)",
      base0F: "rgba(1, 1, 1, 0.8)",
    };
    expect(isTheme(test)).toBe(false);
  });

  it("isTheme object", () => {
    const test = { a: true };
    expect(isTheme(test)).toBe(false);
  });

  it("isTheme number", () => {
    const test = 50;
    expect(isTheme(test)).toBe(false);
  });
});
