import { cleanup } from "@testing-library/react-hooks";

import ObjectAttributes from "@/js/stores/ObjectAttributes";

describe("ObjectAttributes", () => {
  afterEach(() => {
    cleanup();
  });
  it("set a value in empty store", () => {
    const rjvId = "id";
    const name = "test_name";
    const key = "test_key";
    const value = "test_value";

    ObjectAttributes.set(rjvId, name, key, value);
    expect(ObjectAttributes.get(rjvId, name, key, value)).toBe(value);
  });

  it("set a value that was already set", () => {
    const rjvId = "id";
    const name = "test_name";
    const key = "test_key";
    const value = "test_value";

    ObjectAttributes.set(rjvId, name, key, value);
    ObjectAttributes.set(rjvId, name, key, value);
    expect(ObjectAttributes.get(rjvId, name, key, value)).toBe(value);
  });
});
