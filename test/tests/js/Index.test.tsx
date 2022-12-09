import React from "react";
import { render, cleanup } from "@testing-library/react";
// import { error } from "console";
import "@testing-library/jest-dom";

import ReactJsonViewContext from "../../../src/js/components/ReactJsonViewContext";

import Index from "../../../src/js/index";

describe("<Index />", function () {
  const rjvId = 1;

  // it("check data type labels from index", function() {
  //     const { getByText } = render(
  //         <Index
  //             src={{
  //                 bool: true,
  //                 str: "test",
  //                 int: 5,
  //                 nan: NaN,
  //                 null: null,
  //                 func: test => {},
  //                 obj: {
  //                     arrChild: [1, 2, "three"],
  //                     objChild: {
  //                         one: 1,
  //                         two: "two"
  //                     }
  //                 },
  //                 arr: [[1, "two"], { one: "one", two: 2 }],
  //                 regexp: /[0-9]/gi
  //             }}
  //         />
  //     )

  //     expect(getByText(".data-type-label")).toHaveLength(14)
  //     expect(getByText(".data-type-label")).toHaveLength(14)
  // })

  // it("check object-size labels from index", function() {
  //     const wrapper = mount(
  //         <Index
  //             src={{
  //                 bool: true,
  //                 str: "test",
  //                 int: 5,
  //                 nan: NaN,
  //                 null: null,
  //                 func: test => {},
  //                 obj: {
  //                     arrChild: [1, 2, "three"],
  //                     objChild: {
  //                         one: 1,
  //                         two: "two"
  //                     }
  //                 },
  //                 arr: [[1, "two"], { one: "one", two: 2 }],
  //                 regexp: /[0-9]/gi
  //             }}
  //             displayObjectSize={true}
  //             displayDataTypes={true}
  //             enableClipboard={false}
  //         />
  //     )
  //     expect(wrapper.find(".object-size")).toHaveLength(7)

  //     wrapper.setProps({ displayObjectSize: false })
  //     expect(wrapper.find(".object-size")).toHaveLength(0)
  // })

  // it("src replaced with error message (ERROR OUTPUT EXPECTED)", function() {
  //     const wrapper = render(
  //         <Index src={"{jsonEncodedString:true, createError:true}"} />
  //     )
  //     expect(wrapper.find(".data-type-label")).toHaveLength(1)
  // })

  it("make sure copy to clipboard is displayed on all properties: True", function () {
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

  // it("index test getDerivedStateFromProps", function() {
  //     jest.spyOn(Index, "getDerivedStateFromProps").mockClear()
  //     // mount() will cause getDerivedStateFromProps to be called twice.
  //     // 1. before first render()
  //     // 2. result of setState() in componentDidMount()
  //     const wrapper = mount(<Index src={{ test: true }} />)
  //     expect(wrapper.find(".data-type-label")).toHaveLength(1)
  //     // setProps() will cause getDerivedStateFromProps to be called once.
  //     wrapper.setProps({ src: { test1: true, test2: false } })
  //     // in total, it was called thrice.
  //     expect(Index.getDerivedStateFromProps).toHaveBeenCalled()
  // })

  // it("index can have ArrayGroup root component", function() {
  //     const wrapper = render(
  //         <Index
  //             name="test"
  //             groupArraysAfterLength={5}
  //             src={new Array(15).fill(0)}
  //         />
  //     )
  //     expect(wrapper.find(".array-group")).toHaveLength(3)
  // })

  // it("length is correct even if an object has a length property", function () {
  //     const wrapper = render(
  //         <Index
  //             src={{
  //                 first: "first property",
  //                 second: "second property",
  //                 length: 1000
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".object-size")).toHaveLength(1)
  // })
});
