import "@testing-library/jest-dom";

import { fireEvent, prettyDOM, render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import ArrayGroup from "../../../../src/js/components/ArrayGroup";
import JsonObject from "../../../../src/js/components/DataTypes/Object";
import JsonString from "../../../../src/js/components/DataTypes/String";
import LocalJsonViewContext from "../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../src/js/components/ReactJsonViewContext";

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

  // it.only("ArrayGroup expands and collapses", () => {
  //   const rendered = render(
  //     <ReactJsonViewContext.Provider
  //       value={
  //         {
  //           props: {
  //             groupArraysAfterLength: 5,
  //             indentWidth: 4,
  //             theme: "rjvDefault",
  //             shouldCollapse: () => false,
  //           },
  //         } as any
  //       }
  //     >
  //       <LocalJsonViewContext.Provider
  //         value={{ namespace: ["obj"], value: largeArray, depth: 0 } as any}
  //       >
  //         <ArrayGroup />
  //       </LocalJsonViewContext.Provider>
  //     </ReactJsonViewContext.Provider>,
  //   );

  //   const iconContainer =
  //     rendered.container.querySelectorAll(".icon-container");

  //   // fireEvent(
  //   //   iconContainer,
  //   //   new MouseEvent("click", {
  //   //     bubbles: true,
  //   //     cancelable: true,
  //   //   }),
  //   // );
  //   console.log(iconContainer, prettyDOM(rendered.container));
  //   const expandedIcon = rendered.container.querySelectorAll(".collapsed-icon");
  //   expect(iconContainer).toHaveLength(2);
  //   // const wrapper = shallow(
  //   //   <ArrayGroup
  //   //     groupArraysAfterLength={5}
  //   //     namespace={["test"]}
  //   //     name="test"
  //   //     src={large_array}
  //   //     theme="rjv-default"
  //   //     jsvRoot={false}
  //   //     indentWidth={4}
  //   //   />,
  //   // );
  //   // icon-container
  //   //   wrapper.find(".array-group-brace").first().simulate("click");

  //   //   expect(wrapper.state().expanded[0]).toBe(true);

  //   //   wrapper
  //   //     .find(".array-group")
  //   //     .first()
  //   //     .find(".icon-container")
  //   //     .simulate("click");

  //   //   expect(wrapper.state().expanded[0]).toBe(false);
  // });

  //   it("ArrayGroup displays arrays on expansion", () => {
  //     const wrapper = mount(
  //       <ArrayGroup
  //         groupArraysAfterLength={5}
  //         namespace={["test"]}
  //         name="test"
  //         src={large_array}
  //         theme="rjv-default"
  //         jsvRoot={false}
  //         indentWidth={4}
  //       />,
  //     );

  //     wrapper.setState({ expanded: { 0: true } });

  //     expect(wrapper.find(JsonObject).length).toBe(1);

  //     expect(wrapper.find(JsonObject).find(JsonString).length).toBe(5);
  //   });

  //   it("ArrayGroup paginates groups accurately", () => {
  //     const test_array = new Array(17).fill("test");

  //     const wrapper = mount(
  //       <ArrayGroup
  //         groupArraysAfterLength={5}
  //         namespace={["test"]}
  //         name="test"
  //         src={test_array}
  //         theme="rjv-default"
  //         jsvRoot={false}
  //         indentWidth={4}
  //       />,
  //     );

  //     expect(wrapper.find(".array-group").length).toBe(4);

  //     wrapper.setState({ expanded: { 3: true } });

  //     expect(wrapper.find(".array-group").last().find(JsonString).length).toBe(2);
  //   });

  //   it("ArrayGroup renders at root", () => {
  //     const wrapper = render(
  //       <ArrayGroup
  //         groupArraysAfterLength={5}
  //         namespace={["test"]}
  //         name="test"
  //         src={large_array}
  //         theme="rjv-default"
  //         jsvRoot
  //         indentWidth={4}
  //       />,
  //     );

  //     expect(wrapper.find(".array-group").length).toBe(3);
  //   });
});
