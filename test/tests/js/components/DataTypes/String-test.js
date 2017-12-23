import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"

import JsonString from "./../../../../../src/js/components/DataTypes/String"
import DataTypeLabel from "./../../../../../src/js/components/DataTypes/DataTypeLabel"

describe("<JsonString />", function() {
    it("string component should have a data type label", function() {
        const rjvId = 1
        const wrapper = shallow(
            <JsonString
                value="test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(DataTypeLabel)).to.have.length(1)
    })

    it("string with hidden data type", function() {
        const rjvId = 1
        const props = {
            value: "test",
            rjvId: 1,
            theme: "rjv-default",
            displayDataTypes: false
        }
        const component = shallow(<JsonString {...props} />).render()
        expect(component.find(".data-type-label.hidden")).to.have.length(1)
    })

    //test collapsed string and expand click
    it("string displaying data type", function() {
        const rjvId = 1
        const props = {
            value: "test",
            rjvId: 1,
            displayDataTypes: false,
            theme: "rjv-default"
        }
        const component = shallow(<JsonString {...props} />).render()
        expect(component.find(".data-type-label")).to.have.length(1)
    })

    it("collapsed string content", function() {
        const rjvId = 1
        const props = {
            value: "123456789",
            collapseStringsAfterLength: 3,
            rjvId: 1,
            displayDataTypes: false,
            theme: "rjv-default"
        }
        const component = shallow(<JsonString {...props} />)
        expect(
            component
                .render()
                .find(".string-value")
                .text()
        ).to.equal('"123 ..."')
        component.find(".string-value").simulate("click")
        expect(
            component
                .render()
                .find(".string-value")
                .text()
        ).to.equal('"123456789"')
    })
})
