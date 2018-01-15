import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonBoolean from "./../../../../../src/js/components/DataTypes/Boolean"

describe("<JsonBoolean />", function() {
    const rjvId = 1

    it("bool component should have a data type label: True", function() {
        const wrapper = mount(
            <JsonBoolean
                value={true}
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("bool component not should have a data type label: True", function() {
        const wrapper = mount(
            <JsonBoolean
                value={true}
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("bool component should have a data type label: False", function() {
        const wrapper = mount(
            <JsonBoolean
                value={false}
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("bool component should have a data type label: False", function() {
        const wrapper = mount(
            <JsonBoolean
                value={false}
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
