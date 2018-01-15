import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"

import DataTypeLabel from "./../../../../../src/js/components/DataTypes/DataTypeLabel"

describe("<DataTypeLabel />", function() {
    const rjvId = 1

    it("DataTypeLabel should exist when displayDataTypes is true", function() {
        const wrapper = shallow(
            <DataTypeLabel
                type_name="test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("DataTypeLabel should not exist when displayDataTypes is false", function() {
        const wrapper = shallow(
            <DataTypeLabel
                type_name="test"
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })
})
