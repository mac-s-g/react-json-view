import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonBoolean from "../../../../../src/js/components/DataTypes/Boolean";
import LocalJsonViewContext from "../../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../../src/js/components/ReactJsonViewContext";

describe("<JsonBoolean />", () => {
  afterEach(() => {
    cleanup();
  });

  it("bool component should have a data type label: True", () => {
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
            value: true,
          }}
        >
          <JsonBoolean />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(1);
  });

  it("bool component not should have a data type label: True", () => {
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
            value: true,
          }}
        >
          <JsonBoolean />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");

    expect(dataTypeLabelElem).toHaveLength(0);
  });

  it("bool component should have a data type label: False", () => {
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
            value: false,
          }}
        >
          <JsonBoolean />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");

    expect(dataTypeLabelElem).toHaveLength(1);
  });

  it("bool component should have a data type label: False", () => {
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
            value: false,
          }}
        >
          <JsonBoolean />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");

    expect(dataTypeLabelElem).toHaveLength(0);
  });
});
