import getStyle from "../../../../src/js/themes/getStyle";

describe("getStyle", () => {
  const rjvId = 1;

  it("test that style is returned", () => {
    const style = getStyle("rjvDefault", "app-container");
    expect(style.style.cursor).toBe("default");
  });

  it("test objectKeyVal return", () => {
    const style = getStyle("rjvDefault", "objectKeyVal", { paddingLeft: 10 });
    expect(style.style).toBeDefined();
  });

  it('test "none" theme', () => {
    const style = getStyle("none", "app-container");
    expect(style.style).toBeDefined();
  });
});
