import "@testing-library/jest-dom";

import { cleanup, render } from "@testing-library/react";
import React from "react";

import Index from "@/js/index";

describe("<Index />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render component with default props", () => {
    const rendered = render(<Index value={{}} />);
    const reactJsonViewElem =
      rendered.container.querySelector(".react-json-view");
    expect(reactJsonViewElem).not.toBe(null);
  });

  it("render component with object as value", () => {
    const rendered = render(
      <Index
        value={{
          fname: "john",
          lname: "doe",
        }}
      />,
    );
    const stringValueElem =
      rendered.container.querySelectorAll(".string-value");
    expect(stringValueElem).toHaveLength(2);
  });

  it("render component with array as value", () => {
    const rendered = render(<Index value={["hello", "world"]} />);
    const stringValueElem =
      rendered.container.querySelectorAll(".string-value");
    expect(stringValueElem).toHaveLength(2);
  });

  it("check data type labels from index", () => {
    render(
      <Index
        value={{
          bool: true,
          str: "test",
          int: 5,
          nan: NaN,
          null: null,
          obj: {
            arrChild: [1, 2, "three"],
            objChild: {
              one: 1,
              two: "two",
            },
          },
          arr: [[1, "two"], { one: "one", two: 2 }],
        }}
      />,
    );

    const dataTypeLabelElement = document.querySelectorAll(".data-type-label");
    expect(dataTypeLabelElement).toHaveLength(13);
  });

  it("check object-size labels from index", () => {
    const rendered = render(
      <Index
        value={{
          bool: true,
          str: "test",
          int: 5,
          nan: NaN,
          null: null,
          obj: {
            arrChild: [1, 2, "three"],
            objChild: {
              one: 1,
              two: "two",
            },
          },
          arr: [[1, "two"], { one: "one", two: 2 }],
        }}
        displayObjectSize
        displayDataTypes
        enableClipboard={false}
      />,
    );
    // console.log(prettyDOM(rendered.container as Element));
    const objectSizeElement = document.querySelectorAll(".object-size");
    expect(objectSizeElement).toHaveLength(7);

    // wrapper.setProps({ displayObjectSize: false });
    // expect(wrapper.find(".object-size")).toHaveLength(0);
  });

  it("make sure copy to clipboard is displayed on all properties: True", () => {
    render(
      <Index
        value={{
          test: true,
          passing: "hopefully",
          arr: [5],
          obj: {},
        }}
      />,
    );
    const clipboardIcons = document.querySelectorAll(
      ".copy-to-clipboard-container",
    );

    expect(clipboardIcons).toHaveLength(6);
  });

  it("index can have ArrayGroup root component", () => {
    render(<Index value={new Array(15).fill(0)} groupArraysAfterLength={5} />);

    const arrayGroupElement = document.querySelectorAll(".array-group");
    expect(arrayGroupElement).toHaveLength(3);
  });

  it("length is correct even if an object has a length property", () => {
    render(
      <Index
        value={{
          first: "first property",
          second: "second property",
          length: 1000,
        }}
        groupArraysAfterLength={5}
      />,
    );

    const objectSizeElement = document.querySelectorAll(".object-size");

    expect(objectSizeElement).toHaveLength(1);
  });
});
