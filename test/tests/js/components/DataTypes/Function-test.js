import React from "react"
import { shallow, mount } from "enzyme"
import { expect } from "chai"

import JsonFunction from "./../../../../../src/js/components/DataTypes/Function"

import AttributeStore from "./../../../../../src/js/stores/ObjectAttributes"

describe("<JsonFunction />", function() {
    const rjvId = 1

    it("function component should have a data type label", function() {
        const wrapper = mount(
            <JsonFunction
                value={function() {}}
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(1)
    })

    it("function component should not have a data type label", function() {
        const wrapper = mount(
            <JsonFunction
                value={function() {}}
                rjvId={rjvId}
                displayDataTypes={false}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".data-type-label")).to.have.length(0)
    })

    it("function component expanded", function() {
        AttributeStore.set(rjvId, "function-test", "collapsed", false)

        const wrapper = shallow(
            <JsonFunction
                value={function() {}}
                namespace="function-test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )
        expect(wrapper.find(".function-collapsed")).to.have.length(0)
    })

    it("function component collapsed", function() {
        AttributeStore.set(rjvId, "function-test", "collapsed", true)

        const wrapper = shallow(
            <JsonFunction
                value={function() {}}
                namespace="function-test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )

        expect(wrapper.find(".function-collapsed")).to.have.length(1)
    })

    it("function component click to expand", function() {
        AttributeStore.set(rjvId, "function-test", "collapsed", true)

        const wrapper = shallow(
            <JsonFunction
                value={function() {}}
                namespace="function-test"
                rjvId={rjvId}
                displayDataTypes={true}
                theme="rjv-default"
            />
        )

        expect(wrapper.find(".function-collapsed")).to.have.length(1)

        wrapper.find(".rjv-function-container").simulate("click")

        expect(wrapper.find(".function-collapsed")).to.have.length(0)
    })
})
