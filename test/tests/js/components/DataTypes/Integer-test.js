import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"

import JsonInteger from "./../../../../../src/js/components/DataTypes/Integer"
import DataTypeLabel from "./../../../../../src/js/components/DataTypes/DataTypeLabel"

describe("<JsonInteger />", function() {
    const rjvId = 1

    it("integer component should have a data type label", function() {
        const wrapper = shallow(
            <JsonInteger
                value={1}
                displayDataTypes={true}
                rjvId={rjvId}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(DataTypeLabel)).to.have.length(1)
    })
})
