import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonNumber from "../../../../../src/js/components/DataTypes/Number";
import LocalJsonViewContext from "../../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../../src/js/components/ReactJsonViewContext";

describe("<JsonNumber />", () => {
  afterEach(() => {
    cleanup();
  });

  it("Number component should have a data type label", () => {
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
              value: 1,
            } as any
          }
        >
          <JsonNumber />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(1);
  });

  it("Number component should not have a data type label", () => {
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
              value: 1,
            } as any
          }
        >
          <JsonNumber />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(0);
  });
});
