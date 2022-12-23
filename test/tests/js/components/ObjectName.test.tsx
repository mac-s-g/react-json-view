import "@testing-library/jest-dom";

import { prettyDOM, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ObjectName from "@/js/components/ObjectName";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<ObjectName />", () => {
  afterEach(() => {
    cleanup();
  });

  it("ObjectName render", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: true,
              quotesOnKeys: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              value: true,
              namespace: ["obj"],
              parentType: "object",
              depth: 1,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const objectKeyElem = rendered.container.querySelectorAll(".object-key");
    expect(objectKeyElem).toHaveLength(1);
  });

  it("ObjectName with parent array mount", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: true,
              quotesOnKeys: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              namespace: ["0"],
              parentType: "array",
              depth: 2,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const arrayKeyElem = rendered.container.querySelectorAll(".array-key");
    expect(arrayKeyElem).toHaveLength(1);
  });

  it("ObjectName at root without name", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: false,
              quotesOnKeys: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              namespace: [],
              parentType: "object",
              depth: 2,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const objectNameContainer =
      rendered.container.querySelector(".object-key span");
    expect(objectNameContainer?.textContent).toBe("");
  });

  it("ObjectName with quotesOnKeys enabled (default)", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: false,
              quotesOnKeys: true,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              namespace: ["obj"],
              parentType: "object",
              depth: 2,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const objectNameContainer =
      rendered.container.querySelectorAll(".object-key span");
    expect(objectNameContainer).toHaveLength(3);
  });

  it("ObjectName with quotesOnKeys disabled", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: false,
              quotesOnKeys: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              namespace: ["obj"],
              parentType: "object",
              depth: 2,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const objectNameContainer =
      rendered.container.querySelectorAll(".object-key span");
    expect(objectNameContainer).toHaveLength(1);
  });

  it("ObjectName array hides key", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              displayArrayKey: false,
              quotesOnKeys: false,
            },
          } as any
        }
      >
        {" "}
        <LocalJsonViewContext.Provider
          value={
            {
              namespace: ["0"],
              parentType: "array",
              depth: 2,
            } as any
          }
        >
          <ObjectName />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const arrayKeyElem = rendered.container.querySelectorAll(".array-key");
    expect(arrayKeyElem).toHaveLength(0);
  });
});
