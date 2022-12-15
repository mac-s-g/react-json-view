import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonNan from "./../../../../../src/js/components/DataTypes/Nan"

describe("<JsonNan />", function() {
    const rjvId = 1

    it("Nan component should not data type label (display types enabled)", function() {
        const wrapper = mount(
            <JsonNan
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("Nan component should not data type label (display types enabled)", function() {
        const wrapper = mount(
            <JsonNan
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
