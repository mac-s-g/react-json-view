import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import DataTypeLabel from "@/js/components/DataTypes/DataTypeLabel";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<DataTypeLabel />", () => {
  afterEach(() => {
    cleanup();
  });

  it("DataTypeLabel should exist when displayDataTypes is true", () => {
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
        <DataTypeLabel typeName="string" />
      </ReactJsonViewContext.Provider>,
    );

    const dataTypelabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypelabelElem).toHaveLength(1);
  });

  it("DataTypeLabel should not exist when displayDataTypes is false", () => {
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
        <DataTypeLabel typeName="string" />
      </ReactJsonViewContext.Provider>,
    );

    const dataTypelabelElem =
      rendered.container.querySelectorAll(".data-type-label");
    expect(dataTypelabelElem).toHaveLength(0);
  });
});
