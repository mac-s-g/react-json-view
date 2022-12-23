import "@testing-library/jest-dom";

import { fireEvent, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import ArrayGroup from "@/js/components/ArrayGroup";
import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<ArrayGroup />", () => {
  afterEach(() => {
    cleanup();
  });
  const largeArray = new Array(15).fill("test");

  it("ArrayGroup render", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              groupArraysAfterLength: 5,
              indentWidth: 4,
              theme: "rjvDefault",
              shouldCollapse: () => false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={{ namespace: ["obj"], value: largeArray, depth: 1 } as any}
        >
          <ArrayGroup />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const arrayGroupElem = rendered.container.querySelectorAll(".array-group");
    expect(arrayGroupElem).toHaveLength(3);
  });

  it("ArrayGroup expands and collapses", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              groupArraysAfterLength: 5,
              indentWidth: 4,
              theme: "rjvDefault",
              shouldCollapse: () => false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={{ namespace: ["obj"], value: largeArray, depth: 0 } as any}
        >
          <ArrayGroup />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const iconContainer = rendered.container.querySelector(".icon-container")!;

    let expandedIcon = rendered.container.querySelectorAll(".expanded-icon");
    expect(expandedIcon).toHaveLength(0);
    let collapsedIcon = rendered.container.querySelectorAll(".collapsed-icon");
    expect(collapsedIcon).toHaveLength(3);
    fireEvent(
      iconContainer,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expandedIcon = rendered.container.querySelectorAll(".expanded-icon");
    expect(expandedIcon).toHaveLength(1);
    collapsedIcon = rendered.container.querySelectorAll(".collapsed-icon");
    expect(collapsedIcon).toHaveLength(2);
  });

  it("ArrayGroup displays arrays on expansion", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              groupArraysAfterLength: 5,
              indentWidth: 4,
              theme: "rjvDefault",
              shouldCollapse: () => false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={{ namespace: ["obj"], value: largeArray, depth: 0 } as any}
        >
          <ArrayGroup />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    expect(rendered.container.querySelectorAll(".variable-row")).toHaveLength(
      0,
    );
    const iconContainer =
      rendered.container.querySelectorAll(".icon-container")!;
    fireEvent(
      iconContainer[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(rendered.container.querySelectorAll(".variable-row")).toHaveLength(
      5,
    );
  });

  it("ArrayGroup paginates groups accurately", () => {
    const testArray = new Array(18).fill("test");
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              groupArraysAfterLength: 5,
              indentWidth: 4,
              theme: "rjvDefault",
              shouldCollapse: () => false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={{ namespace: ["obj"], value: testArray, depth: 0 } as any}
        >
          <ArrayGroup />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const arrayGroupElem = rendered.container.querySelectorAll(".array-group");
    expect(arrayGroupElem).toHaveLength(4);
    const iconContainer =
      rendered.container.querySelectorAll(".icon-container")!;
    fireEvent(
      iconContainer[3],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(rendered.container.querySelectorAll(".variable-row")).toHaveLength(
      3,
    );
  });

  it("ArrayGroup renders at root", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              groupArraysAfterLength: 5,
              indentWidth: 4,
              theme: "rjvDefault",
              shouldCollapse: () => false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider
          value={{ namespace: ["obj"], value: largeArray, depth: 0 } as any}
        >
          <ArrayGroup />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const arrayGroupElem = rendered.container.querySelectorAll(".array-group");
    expect(arrayGroupElem).toHaveLength(3);
  });
});
