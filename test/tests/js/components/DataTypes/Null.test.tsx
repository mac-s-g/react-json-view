import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import JsonNull from "../../../../../src/js/components/DataTypes/Null";
import LocalJsonViewContext from "../../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../../src/js/components/ReactJsonViewContext";

describe("<JsonNull />", () => {
  afterEach(() => {
    cleanup();
  });

  it("Null component should show no data type label (type labels enabled)", () => {
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
            value: null,
          }}
        >
          <JsonNull />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const dataTypeLabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElem).toHaveLength(0);
  });
});
