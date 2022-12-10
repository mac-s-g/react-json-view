import { fireEvent, prettyDOM, render } from "@testing-library/react";
import React, { useContext } from "react";

import LocalJsonViewContext from "../../../../src/js/components/LocalJsonViewContext";
import ReactJsonViewContext from "../../../../src/js/components/ReactJsonViewContext";
import VariableEditor from "../../../../src/js/components/VariableEditor";
import Index from "../../../../src/js/index";

describe("<VariableEditor />", () => {
  it("VariableEditor click-to-edit should be visible", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={{
          /* @ts-ignore */
          props: {
            canEdit: true,
            canDelete: true,
            enableClipboard: true,
            theme: "rjvDefault",
            indentWidth: 4,
            quotesOnKeys: true,
            displayArrayKey: true,
          },
          rjvId,
        }}
      >
        {" "}
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: "test",
            namespace: ["name"],
            parentType: "object",
          }}
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );
    const clickEditClass = document.querySelectorAll(
      ".variable-value ~ .click-to-edit",
    );
    expect(clickEditClass).toHaveLength(1);
  });

  it("VariableEditor click-to-edit should be hidden when onEdit disabled", () => {
    const rjvId = "id";

    render(
      <ReactJsonViewContext.Provider
        value={{
          /* @ts-ignore */
          props: {
            canEdit: false,
            canDelete: true,
            enableClipboard: true,
            theme: "rjvDefault",
            indentWidth: 4,
            quotesOnKeys: true,
            displayArrayKey: true,
          },
          rjvId,
        }}
      >
        <LocalJsonViewContext.Provider
          /* @ts-ignore */
          value={{
            value: "test",
            namespace: ["name"],
            parentType: "object",
          }}
        >
          <VariableEditor />
        </LocalJsonViewContext.Provider>
      </ReactJsonViewContext.Provider>,
    );

    const clickEditClass = document.querySelectorAll(
      ".variable-value ~ .click-to-edit",
    );
    expect(clickEditClass).toHaveLength(0);
  });

  // it("VariableEditor click-to-edit should be hidden when editMode is active", function() {
  //     const rjvId = "id";

  //     const rendered = render(
  //         <ReactJsonViewContext.Provider
  //             value={{
  //                  /* @ts-ignore */
  //                 props: {
  //                     canEdit: true,
  //                     canDelete: true,
  //                     enableClipboard: true,
  //                     theme: "rjvDefault",
  //                     indentWidth: 4,
  //                     quotesOnKeys: true,
  //                     displayArrayKey: true,
  //                 },
  //                 rjvId
  //             }}
  //         >
  //              {/* @ts-ignore */}
  //             <LocalJsonViewContext.Provider value={{
  //                 value: "test",
  //                 namespace: ['name'],
  //                 parentType: "object"
  //             }}>
  //                 <VariableEditor />
  //             </LocalJsonViewContext.Provider>
  //         </ReactJsonViewContext.Provider>
  //     )

  //     const clickEditClass = document.querySelectorAll('.variable-value ~ .click-to-edit');
  //     fireEvent(
  //         document.querySelector('.variable-value ~ .click-to-edit .click-to-edit-icon')!,
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         }),
  //       )
  //     console.log(prettyDOM(rendered.container as Element), document.querySelector('.variable-value ~ .click-to-edit .click-to-edit-icon'))
  //     expect(clickEditClass).toHaveLength(0)
  // })

  // it("VariableEditor test textarea and cancel icon", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: 5,
  //                 type: "int"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").length).toBe(1)
  //     wrapper.find(".edit-cancel").simulate("click")
  //     expect(wrapper.find(".variable-editor").length).toBe(0)
  // })

  // it("VariableEditor test textarea and submit icon", function() {
  //     const existing_value = "existing_value"
  //     const new_value = "new_value"
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: existing_value }}
  //             theme="rjv-default"
  //             onEdit={edit => {
  //                 expect(edit.updated_src.test).toBe(new_value)
  //             }}
  //             namespace={["test"]}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: existing_value,
  //                 type: "string"
  //             }}
  //         />
  //     )

  //     //editMode defaluts to off
  //     expect(wrapper.state("editMode")).toBe(false)
  //     //click to open textarea
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     //verify editMode is on
  //     expect(wrapper.state("editMode")).toBe(true)
  //     //make sure default textarea value is correct
  //     expect(wrapper.find(".variable-editor").props().value).toBe(existing_value)
  //     //update edit value
  //     wrapper.setState({ editValue: new_value })
  //     //submit new value
  //     wrapper.find(".edit-check").simulate("click")
  //     //make sure editMode is off after submit
  //     expect(wrapper.state("editMode")).toBe(false)
  // })

  // it("VariableEditor edit after src change should respect current src", function() {
  //     const existing_value = "existing_value"
  //     const new_value = "new_value"
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: existing_value }}
  //             theme="rjv-default"
  //             onEdit={edit => {
  //                 expect(edit.updated_src.test).toBe(new_value)
  //             }}
  //             namespace={["test"]}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: existing_value,
  //                 type: "string"
  //             }}
  //         />
  //     )

  //     //editMode defaluts to off
  //     expect(wrapper.state("editMode")).toBe(false)
  //     //click to open textarea
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     //verify editMode is on
  //     expect(wrapper.state("editMode")).toBe(true)
  //     //make sure default textarea value is correct
  //     expect(wrapper.find(".variable-editor").props().value).toBe(existing_value)
  //     //update edit value
  //     wrapper.setState({ editValue: new_value })
  //     //cancel update
  //     wrapper.find(".edit-cancel").simulate("click")
  //     //make sure editMode is off after cancel
  //     expect(wrapper.state("editMode")).toBe(false)
  //     //pop open textarea again
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     //make sure editMode is on
  //     expect(wrapper.state("editMode")).toBe(true)
  //     //make sure that textarea still contains original value
  //     expect(wrapper.find(".variable-editor").props().value).toBe(existing_value)
  // })

  // it("VariableEditor detected null", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "null",
  //                 type: "null"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("null")
  // })

  // it("VariableEditor detected undefined", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "undefined",
  //                 type: "undefined"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("undefined")
  // })

  // it("VariableEditor detected NaN", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "NaN",
  //                 type: "nan"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("NaN")
  // })

  // it("VariableEditor detected string", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "test",
  //                 type: "string"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("test")
  // })

  // it("VariableEditor detected function", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "function test() {}",
  //                 type: "function"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("function test() {}")
  // })

  // it("VariableEditor detected object", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "{}",
  //                 type: "object"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("{}")
  // })

  // it("VariableEditor detected array", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "[1,2,3]",
  //                 type: "array"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("[1,2,3]")
  // })

  // it("VariableEditor detected float", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "-5.2",
  //                 type: "float"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("-5.2")
  // })

  // it("VariableEditor detected integer", function() {
  //     const wrapper = shallow(
  //         <VariableEditor
  //             src={{ test: true }}
  //             theme="rjv-default"
  //             onEdit={edit => {}}
  //             rjvId={rjvId}
  //             variable={{
  //                 name: "test",
  //                 value: "5",
  //                 type: "integer"
  //             }}
  //         />
  //     )
  //     expect(wrapper.find(".click-to-edit-icon").length).toBe(1)
  //     wrapper.find(".click-to-edit-icon").simulate("click")
  //     expect(wrapper.state("editMode")).toBe(true)
  //     expect(wrapper.find(".variable-editor").props().value).toBe("5")
  // })
});
