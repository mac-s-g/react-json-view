import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonString from "../../../../../src/js/components/DataTypes/String";
import LocalJsonViewContext from "../../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../../src/js/components/ReactJsonViewContext";

describe("<JsonString />", () => {
  afterEach(() => {
    cleanup();
  });
  it("string component should have a data type label", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={{
          /* @ts-ignore */
          props: {
            theme: "rjvDefault",
            displayDataTypes: true,
          },
        }}
      >
        {" "}
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: "test",
          }}
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
        value={{
          /* @ts-ignore */
          props: {
            theme: "rjvDefault",
            displayDataTypes: false,
          },
        }}
      >
        {" "}
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: "test",
          }}
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
        value={{
          /* @ts-ignore */
          props: {
            theme: "rjvDefault",
            displayDataTypes: false,
            collapseStringsAfterLength: 3,
          },
        }}
      >
        {" "}
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: "123456789",
          }}
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
