import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import Index from "./../../../../src/js/index"
import VariableEditor from "./../../../../src/js/components/VariableEditor"

describe("<VariableEditor />", function() {
    const rjvId = 1

    it("VariableEditor click-to-edit should be visible", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                singleIndent={1}
                variable={{
                    name: "test",
                    value: 5,
                    type: "int"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit")).to.have.length(1)
    })

    it("VariableEditor click-to-edit should be hidden when onEdit disabled", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={false}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: 5,
                    type: "int"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit")).to.have.length(0)
    })

    it("VariableEditor click-to-edit should be hidden when editMode is active", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: 5,
                    type: "int"
                }}
            />
        )
        wrapper.setState({ editMode: true })
        expect(wrapper.find(".click-to-edit")).to.have.length(0)
    })

    it("VariableEditor test textarea and cancel icon", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: 5,
                    type: "int"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").length).to.equal(1)
        wrapper.find(".edit-cancel").simulate("click")
        expect(wrapper.find(".variable-editor").length).to.equal(0)
    })

    it("VariableEditor test textarea and submit icon", function() {
        const existing_value = "existing_value"
        const new_value = "new_value"
        const wrapper = shallow(
            <VariableEditor
                src={{ test: existing_value }}
                theme="rjv-default"
                onEdit={edit => {
                    expect(edit.updated_src.test).to.equal(new_value)
                }}
                namespace={["test"]}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: existing_value,
                    type: "string"
                }}
            />
        )

        //editMode defaluts to off
        expect(wrapper.state("editMode")).to.equal(false)
        //click to open textarea
        wrapper.find(".click-to-edit-icon").simulate("click")
        //verify editMode is on
        expect(wrapper.state("editMode")).to.equal(true)
        //make sure default textarea value is correct
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            existing_value
        )
        //update edit value
        wrapper.setState({ editValue: new_value })
        //submit new value
        wrapper.find(".edit-check").simulate("click")
        //make sure editMode is off after submit
        expect(wrapper.state("editMode")).to.equal(false)
    })

    it("VariableEditor edit after src change should respect current src", function() {
        const existing_value = "existing_value"
        const new_value = "new_value"
        const wrapper = shallow(
            <VariableEditor
                src={{ test: existing_value }}
                theme="rjv-default"
                onEdit={edit => {
                    expect(edit.updated_src.test).to.equal(new_value)
                }}
                namespace={["test"]}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: existing_value,
                    type: "string"
                }}
            />
        )

        //editMode defaluts to off
        expect(wrapper.state("editMode")).to.equal(false)
        //click to open textarea
        wrapper.find(".click-to-edit-icon").simulate("click")
        //verify editMode is on
        expect(wrapper.state("editMode")).to.equal(true)
        //make sure default textarea value is correct
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            existing_value
        )
        //update edit value
        wrapper.setState({ editValue: new_value })
        //cancel update
        wrapper.find(".edit-cancel").simulate("click")
        //make sure editMode is off after cancel
        expect(wrapper.state("editMode")).to.equal(false)
        //pop open textarea again
        wrapper.find(".click-to-edit-icon").simulate("click")
        //make sure editMode is on
        expect(wrapper.state("editMode")).to.equal(true)
        //make sure that textarea still contains original value
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            existing_value
        )
    })

    it("VariableEditor detected null", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "null",
                    type: "null"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("null")
    })

    it("VariableEditor detected undefined", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "undefined",
                    type: "undefined"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            "undefined"
        )
    })

    it("VariableEditor detected NaN", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "NaN",
                    type: "nan"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("NaN")
    })

    it("VariableEditor detected string", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "test",
                    type: "string"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("test")
    })

    it("VariableEditor detected function", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "function test() {}",
                    type: "function"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            "function test() {}"
        )
    })

    it("VariableEditor detected object", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "{}",
                    type: "object"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("{}")
    })

    it("VariableEditor detected array", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "[1,2,3]",
                    type: "array"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal(
            "[1,2,3]"
        )
    })

    it("VariableEditor detected float", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "-5.2",
                    type: "float"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("-5.2")
    })

    it("VariableEditor detected integer", function() {
        const wrapper = shallow(
            <VariableEditor
                src={{ test: true }}
                theme="rjv-default"
                onEdit={edit => {}}
                rjvId={rjvId}
                variable={{
                    name: "test",
                    value: "5",
                    type: "integer"
                }}
            />
        )
        expect(wrapper.find(".click-to-edit-icon").length).to.equal(1)
        wrapper.find(".click-to-edit-icon").simulate("click")
        expect(wrapper.state("editMode")).to.equal(true)
        expect(wrapper.find(".variable-editor").props().value).to.equal("5")
    })
})
