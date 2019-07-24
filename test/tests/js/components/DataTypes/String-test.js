import React from "react"
import { shallow, mount } from "enzyme"
import { expect } from "chai"

import JsonString from "./../../../../../src/js/components/DataTypes/String"

describe("<JsonString />", function() {
    it("string component should have a data type label", function() {
        const rjvId = 1
        const wrapper = mount(
            <JsonString
                value="test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("string with hidden data type", function() {
        const rjvId = 1
        const props = {
            value: "test",
            rjvId: 1,
            theme: "rjv-default",
            displayDataTypes: false
        }
        const component = mount(<JsonString {...props} />).render()
        expect(component.find(".data-type-label")).to.have.length(0)
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
        const component = mount(<JsonString {...props} />).render()
        expect(component.find(".data-type-label")).to.have.length(0)
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
        const beforeClickedValue = component.render().find(".string-value").text()
        expect(beforeClickedValue).to.equal('"123 ..."')
        component.find(".string-value").prop('onMouseDown')({ nativeEvent: { x: 0, y: 0} })
        component.find(".string-value").prop('onMouseUp')({ nativeEvent: { x: 0, y: 0} })
        component.update()
        component.render()
        const afterClickedValue = component.find(".string-value").text()
        expect(afterClickedValue).to.equal('"123456789"')
    })
})
