import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonFloat from "./../../../../../src/js/components/DataTypes/Float"

describe("<JsonFloat />", function() {
    const rjvId = 1

    it("float component should have a data type label", function() {
        const wrapper = mount(
            <JsonFloat
                value={1.25}
                displayDataTypes={true}
                rjvId={rjvId}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("float component should not have a data type label", function() {
        const wrapper = mount(
            <JsonFloat
                value={1.25}
                displayDataTypes={false}
                rjvId={rjvId}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
