import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import ObjectKeyModal from "./../../../../../src/js/components/ObjectKeyModal/ObjectKeyModal"

const rjvId = 1

describe("<ObjectKeyModal />", function() {
    it("ObjectKeyModal input change", function() {
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={() => {
                    return true
                }}
                submit={() => {
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        expect(wrapper.find(".key-modal-input").props().value).to.equal("test")
        wrapper
            .find(".key-modal-input")
            .simulate("change", { target: { value: "tests" } })
        expect(wrapper.state("input")).to.equal("tests")
        expect(wrapper.find(".key-modal-input").props().value).to.equal("tests")
    })

    it("ObjectKeyModal invalid input", function() {
        let valid_counter = 0
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={input => {
                    valid_counter++
                    return input === "invalid" ? false : true
                }}
                submit={() => {
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )

        expect(wrapper.find(".key-modal-submit").length).to.equal(2)
        expect(wrapper.find(".key-modal-input").props().value).to.equal("test")
        wrapper
            .find(".key-modal-input")
            .simulate("change", { target: { value: "invalid" } })
        expect(wrapper.state("input")).to.equal("invalid")
        expect(wrapper.find(".key-modal-input").props().value).to.equal(
            "invalid"
        )
        expect(wrapper.find(".key-modal-submit").length).to.equal(0)
        //initial validation plus simluated input change
        expect(valid_counter).to.equal(2)
    })

    it("ObjectKeyModal test submit", function() {
        let submit_counter = 0
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={input => {
                    return true
                }}
                submit={input => {
                    expect(input).to.equal("test")
                    submit_counter++
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )

        expect(wrapper.find(".key-modal-submit").length).to.equal(2)
        wrapper.find(".key-modal-submit").first().simulate("click")
        expect(submit_counter).to.equal(1)
    })

    it("ObjectKeyModal simulate modal close click", function() {
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={() => {
                    return true
                }}
                submit={() => {
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        wrapper.find(".key-modal-cancel").first().simulate("click")
    })

    it("ObjectKeyModal non-Enter key press", function() {
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={() => {
                    return true
                }}
                submit={() => {
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )
        wrapper.setState({ input: "test" })

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        wrapper
            .find(".key-modal-input")
            .simulate("keyPress", { key: "up arrow" })
        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        expect(wrapper.state("input")).to.equal("test")
    })

    it("ObjectKeyModal submit with Enter key press", function() {
        let submit_counter = 0
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={() => {
                    return true
                }}
                submit={() => {
                    submit_counter++
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )
        wrapper.setState({ input: "test" })

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        wrapper.find(".key-modal-input").simulate("keyPress", { key: "Enter" })
        expect(submit_counter).to.equal(1)
        expect(wrapper.state("input")).to.equal("test")
    })

    it("ObjectKeyModal close with Escape", function() {
        let submit_counter = 0
        const wrapper = mount(
            <ObjectKeyModal
                input="test"
                isValid={() => {
                    return true
                }}
                submit={() => {
                    submit_counter++
                    return true
                }}
                theme="rjv-default"
                rjvId={rjvId}
            />
        )
        wrapper.setState({ input: "test" })

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
        wrapper.find(".key-modal-input").simulate("keyPress", { key: "Escape" })
        expect(submit_counter).to.equal(0)
        expect(wrapper.state("input")).to.equal("test")
    })
})
