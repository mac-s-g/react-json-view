import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonDate from "./../../../../../src/js/components/DataTypes/Date"

describe("<JsonDate />", function() {
    const rjvId = 1

    it("date component should have a data type label", function() {
        const wrapper = mount(
            <JsonDate
                value={new Date()}
                displayDataTypes={true}
                rjvId={rjvId}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("date component should not have a data type label", function() {
        const wrapper = mount(
            <JsonDate
                value={new Date()}
                displayDataTypes={false}
                rjvId={rjvId}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
