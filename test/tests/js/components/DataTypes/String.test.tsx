import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonString from "@/js/components/DataTypes/String";
import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<JsonString />", () => {
  afterEach(() => {
    cleanup();
  });
  it("string component should have a data type label", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayDataTypes: true,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
            } as any
          }
        >
          <JsonString />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(1);
  });

  it("string with hidden data type", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayDataTypes: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "test",
            } as any
          }
        >
          <JsonString />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(0);
  });

  // test collapsed string and expand click

  it("collapsed string content", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayDataTypes: false,
              collapseStringsAfterLength: 3,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: "123456789",
            } as any
          }
        >
          <JsonString />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const stringValueElem = rendered.container.querySelector(".string-value")!;

    expect(stringValueElem.textContent).toBe('"123 ..."');
    fireEvent(
      stringValueElem,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(stringValueElem.textContent).toBe('"123456789"');
  });
});
