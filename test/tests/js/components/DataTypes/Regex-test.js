import React from "react"
import { mount } from "enzyme"
import { expect } from "chai"

import JsonRegex from "./../../../../../src/js/components/DataTypes/Function"

import AttributeStore from "./../../../../../src/js/stores/ObjectAttributes"

describe("<JsonRegex />", function() {
    const rjvId = 1

    it("regex component should have a data type label", function() {
        const wrapper = mount(
            <JsonRegex
                value={/[0-9]/gi}
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("regex component should not have a data type label", function() {
        const wrapper = mount(
            <JsonRegex
                value={/[0-9]/gi}
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
