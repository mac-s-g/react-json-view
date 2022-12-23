import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

import LocalJsonViewContext from "@/js/components/LocalJsonViewContext";
import ObjectMeta from "@/js/components/ObjectMeta";
import ReactJsonViewContext from "@/js/components/ReactJsonViewContext";

describe("<ObjectMeta />", () => {
  afterEach(() => {
    cleanup();
  });

  it("ObjectMeta clipboard should not exist", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              enableClipboard: false,
              canAdd: false,
              canDelete: false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider value={{ value: "test" } as any}>
          <ObjectMeta rowHovered />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const copyToClipBoardElem = rendered.container.querySelectorAll(
      ".copy-to-clipboard-container",
    );

    expect(copyToClipBoardElem).toHaveLength(0);
  });

  it("ObjectMeta size should exist", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              enableClipboard: false,
              canAdd: false,
              canDelete: false,
              displayObjectSize: true,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider value={{ value: "test" } as any}>
          <ObjectMeta rowHovered />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const objectSizeElem = rendered.container.querySelectorAll(".object-size");

    expect(objectSizeElem).toHaveLength(1);
  });

  it("ObjectMeta size should not exist", () => {
    const rendered = render(
      <ReactJsonViewContext.Provider
        value={
          {
            props: {
              theme: "rjvDefault",
              enableClipboard: false,
              canAdd: false,
              canDelete: false,
              displayObjectSize: false,
            },
          } as any
        }
      >
        <LocalJsonViewContext.Provider value={{ value: "test" } as any}>
          <ObjectMeta rowHovered />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const objectSizeElem = rendered.container.querySelector(".object-size");

    expect(objectSizeElem?.textContent).toBe("");
  });

  //   it("ObjectMeta clipboard click with copy callback", () => {
  //     const input_src = { test: true };
  //     let callback_counter = 0;
  //     const wrapper = mount(
  //       <ObjectMeta
  //         src={input_src}
  //         size={1}
  //         theme="rjv-default"
  //         namespace={["test"]}
  //         enableClipboard={(copy) => {
  //           expect(copy.src.test).toBe(input_src.test);
  //           // increment counter to assert that callback was called
  //           callback_counter++;
  //         }}
  //         onAdd={false}
  //         onDelete={false}
  //         rjvId={rjvId}
  //       />,
  //     );
  //     expect(wrapper.find(".copy-to-clipboard-container")).toHaveLength(1);
  //     expect(wrapper.find(".copy-icon")).toHaveLength(2);

  //     document.execCommand = (mock) => {};
  //     wrapper.find(".copy-icon").first().simulate("click");
  //     // verify that callback was called
  //     expect(callback_counter).toBe(1);
  //   });

  // it("ObjectMeta clipboard click without copy callback", () => {
  //   const wrapper = mount(
  //     <ObjectMeta
  //       src={{ test: true }}
  //       size={1}
  //       theme="rjv-default"
  //       enableClipboard
  //       onAdd={false}
  //       onDelete={false}
  //       rjvId={rjvId}
  //     />,
  //   );
  //   expect(wrapper.find(".copy-to-clipboard-container")).toHaveLength(1);
  //   expect(wrapper.find(".copy-icon")).toHaveLength(2);
  // });
});
