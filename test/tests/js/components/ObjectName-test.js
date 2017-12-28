import React from "react"
import { render } from "enzyme"
import { expect } from "chai"

import ObjectName from "./../../../../src/js/components/ObjectName"

describe("<ObjectName />", function() {
    it("ObjectName mount", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                theme="rjv-default"
                jsvRoot={false}
            />
        )
        expect(wrapper.find(".object-key")).to.have.length(1)
    })

    it("ObjectName with parent array mount", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name="test"
                parent_type="array"
                theme="rjv-default"
                jsvRoot={false}
            />
        )
        expect(wrapper.find(".array-key")).to.have.length(1)
    })

    it("ObjectName at root without name", function() {
        const wrapper = render(
            <ObjectName
                namespace={"test"}
                name={false}
                theme="rjv-default"
                jsvRoot={true}
            />
        )
        expect(wrapper.find("span").children()).to.have.length(0)
    })
})
