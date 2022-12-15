import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonNull from "../../../../../src/js/components/DataTypes/Null"

describe("<JsonNull />", function() {
    const rjvId = 1

    it("Null component should no data type label (type labels enabled)", function() {
        const wrapper = mount(
            <JsonNull
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("Null component should no data type label (type labels disabled)", function() {
        const wrapper = mount(
            <JsonNull
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
