import "@testing-library/jest-dom";

import { prettyDOM, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonObject from "@/js/components/DataTypes/Object";
import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<JsonObject />", () => {
  afterEach(() => {
    cleanup();
  });

  it("Object component should have a data type label", () => {
    const rjvId = "id";
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{
          /* @ts-ignore */
          props: {
            theme: "rjvDefault",
            indentWidth: 1,
            displayDataTypes: true,
            shouldCollapse: () => false,
          },
          rjvId,
        }}
      >
        {" "}
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: { test: true },
            namespace: ["root"],
            type: "boolean",
            depth: 0,
          }}
        >
          <JsonObject
            objectType="object"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const objectKeyValElem =
      rendered.container.querySelectorAll(".object-key-val");
    expect(objectKeyValElem).toHaveLength(1);
  });

  it("Object render, multiple data type labels", () => {
    const value = {
      bool: true, // should have label
      number: 5, // should have label
      str: "test", // should have label
      nan: NaN, // should have label
      null: null,
      arr: [
        1, // should have label
        2, // should have label
      ],
      obj: {
        test: true, // should have label
      },
      empty_arr: [],
      empty_obj: {},
    };
    const rjvId = "id";
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => false,
              groupArraysAfterLength: 100,
            },
            rjvId,
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "boolean",
              depth: 0,
            } as any
          }
        >
          <JsonObject
            objectType="object"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dateTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dateTypeLabelElem).toHaveLength(7);
  });

  it("Object render, no data type labels when collapsed", () => {
    const value = {
      bool: true, // should have label
      int: 5, // should have label
      str: "test", // should have label
      nan: NaN,
      null: null,
      arr: [
        1, // should have label
        2, // should have label
      ],
      obj: {
        test: true, // should have label
      },
    };
    const rjvId = "id";
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => true,
              groupArraysAfterLength: 100,
            },
            rjvId,
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "object",
              depth: 0,
            } as any
          }
        >
          <JsonObject
            objectType="object"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dateTyoeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dateTyoeLabelElem).toHaveLength(0);
  });

  it("Array render expanded", () => {
    const rjvId = "id";
    const value = {
      arr1: ["1", ["2", "3"]],
    };
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => false,
              groupArraysAfterLength: 100,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["arr_test"],
              type: "array",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="array"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const expandedIconElem =
      rendered.container.querySelectorAll(".expanded-icon");
    const collapsedIconElem =
      rendered.container.querySelectorAll(".collapsed-icon");
    expect(expandedIconElem).toHaveLength(3);
    expect(collapsedIconElem).toHaveLength(0);
  });

  const testCollapseAndCollapsedIcon = (
    iconStyle?: "circle" | "triangle" | "square",
  ) => {
    const rjvId = "id";
    const value = {
      arr1: ["1", ["2", "3"]],
    };
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => true,
              groupArraysAfterLength: 100,
              iconStyle: iconStyle ?? "triangle",
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["arr_test"],
              type: "array",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="array"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const expandedIconElem =
      rendered.container.querySelectorAll(".expanded-icon");
    const collapsedIconElem =
      rendered.container.querySelectorAll(".collapsed-icon");
    expect(expandedIconElem).toHaveLength(0);
    expect(collapsedIconElem).toHaveLength(1);
  };

  it("Array render collapsed with circle", () => {
    testCollapseAndCollapsedIcon("circle");
  });

  it("Array render collapsed square", () => {
    testCollapseAndCollapsedIcon("square");
  });

  it("Array render collapsed triangle", () => {
    testCollapseAndCollapsedIcon("triangle");
  });

  it("non-empty array should have ellipsis", () => {
    const rjvId = "id";
    const value = ["1", "2", "3"];
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => true,
              groupArraysAfterLength: 100,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "array",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="array"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const nodeEllipsisElem =
      rendered.container.querySelectorAll(".node-ellipsis");
    expect(nodeEllipsisElem).toHaveLength(1);
  });

  it("empty array should not have ellipsis", () => {
    const rjvId = "id";
    const value = new Array(0);
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => true,
              groupArraysAfterLength: 100,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "array",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="array"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const nodeEllipsisElem =
      rendered.container.querySelectorAll(".node-ellipsis");
    expect(nodeEllipsisElem).toHaveLength(0);
  });

  it("sort object keys", () => {
    const value = {
      d: "d",
      b: "b",
      a: "a",
      c: "c",
    };
    const rjvId = "id";
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => false,
              sortKeys: true,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "object",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="object"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const firstKey = rendered.container.querySelectorAll(".object-key span");

    expect(firstKey[1].textContent).toBe("a");
  });

  it("do not sort object keys", () => {
    const value = {
      d: "d",
      b: "b",
      a: "a",
      c: "c",
    };
    const rjvId = "id";
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              indentWidth: 1,
              displayDataTypes: true,
              shouldCollapse: () => false,
            },
            rjvId,
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={
            {
              value,
              namespace: ["root"],
              type: "object",
              depth: 1,
            } as any
          }
        >
          <JsonObject
            objectType="object"
            indexOffset={0}
            parentIsArrayGroup={false}
          />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const firstKey = rendered.container.querySelectorAll(".object-key span");

    expect(firstKey[1].textContent).toBe("d");
  });
});
