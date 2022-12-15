import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonUndefined from "./../../../../../src/js/components/DataTypes/Undefined"

describe("<JsonUndefined />", function() {
    const rjvId = 1

    it("Undefined component should not have data type label (display types enabled)", function() {
        const wrapper = mount(
            <JsonUndefined
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("Undefined component should not have data type label (display types disabled)", function() {
        const wrapper = mount(
            <JsonUndefined
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
