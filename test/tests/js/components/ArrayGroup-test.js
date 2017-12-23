import React from "react"
import { render, shallow, mount } from "enzyme"
import { expect } from "chai"

import ArrayGroup from "./../../../../src/js/components/ArrayGroup"
import JsonObject from "./../../../../src/js/components/DataTypes/Object"
import JsonString from "./../../../../src/js/components/DataTypes/String"

describe("<ArrayGroup />", function() {
    var large_array = new Array(15).fill("test")

    it("ArrayGroup mount", function() {
        const wrapper = render(
            <ArrayGroup
                groupArraysAfterLength={5}
                namespace={"test"}
                name="test"
                src={large_array}
                theme="rjv-default"
                jsvRoot={false}
            />
        )

        expect(wrapper.find(".array-group").length).to.equal(3)
    })

    it("ArrayGroup expands and collapses", function() {
        const wrapper = shallow(
            <ArrayGroup
                groupArraysAfterLength={5}
                namespace={["test"]}
                name="test"
                src={large_array}
                theme="rjv-default"
                jsvRoot={false}
            />
        )

        wrapper
            .find(".array-group-brace")
            .first()
            .simulate("click")

        expect(wrapper.state().expanded[0]).to.equal(true)

        wrapper
            .find(".array-group")
            .first()
            .find(".icon-container")
            .simulate("click")

        expect(wrapper.state().expanded[0]).to.equal(false)
    })

    it("ArrayGroup displays arrays on expansion", function() {
        const wrapper = mount(
            <ArrayGroup
                groupArraysAfterLength={5}
                namespace={["test"]}
                name="test"
                src={large_array}
                theme="rjv-default"
                jsvRoot={false}
            />
        )

        wrapper.setState({ expanded: { 0: true } })

        expect(wrapper.find(JsonObject).length).to.equal(1)

        expect(wrapper.find(JsonObject).find(JsonString).length).to.equal(5)
    })

    it("ArrayGroup paginates groups accurately", function() {
        var test_array = new Array(17).fill("test")

        const wrapper = mount(
            <ArrayGroup
                groupArraysAfterLength={5}
                namespace={["test"]}
                name="test"
                src={test_array}
                theme="rjv-default"
                jsvRoot={false}
            />
        )

        expect(wrapper.find(".array-group").length).to.equal(4)

        wrapper.setState({ expanded: { 3: true } })

        expect(
            wrapper
                .find(".array-group")
                .last()
                .find(JsonString).length
        ).to.equal(2)
    })

    it("ArrayGroup renders at root", function() {
        const wrapper = render(
            <ArrayGroup
                groupArraysAfterLength={5}
                namespace={["test"]}
                name="test"
                src={large_array}
                theme="rjv-default"
                jsvRoot={true}
            />
        )

        expect(wrapper.find(".array-group").length).to.equal(3)
    })
})
