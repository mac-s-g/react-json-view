import React from "react"
import { shallow, mount } from "enzyme"
import { expect } from "chai"

import ObjectMeta from "./../../../../src/js/components/ObjectMeta"

describe("<ObjectMeta />", function() {
    const rjvId = 1

    it("ObjectMeta clipboard should not exist", function() {
        const wrapper = shallow(
            <ObjectMeta
                src={{ test: true }}
                size={1}
                theme="rjv-default"
                enableClipboard={false}
                onAdd={false}
                onDelete={false}
                rjvId={rjvId}
            />
        )
        expect(wrapper.find(".copy-to-clipboard-container")).to.have.length(0)
    })

    it("ObjectMeta size should exist", function() {
        const wrapper = shallow(
            <ObjectMeta
                src={{ test: true }}
                size={1}
                theme="rjv-default"
                displayObjectSize={true}
                onAdd={false}
                onDelete={false}
                rjvId={rjvId}
            />
        )
        expect(wrapper.find(".object-size")).to.have.length(1)
    })

    it("ObjectMeta size should not exist", function() {
        const wrapper = shallow(
            <ObjectMeta
                src={{ test: true }}
                size={1}
                theme="rjv-default"
                displayObjectSize={false}
                onAdd={false}
                onDelete={false}
                rjvId={rjvId}
            />
        )
        expect(wrapper.find(".object-size")).to.have.length(0)
    })

    it("ObjectMeta clipboard click with copy callback", function() {
        const input_src = { test: true }
        let callback_counter = 0
        const wrapper = mount(
            <ObjectMeta
                src={input_src}
                size={1}
                theme="rjv-default"
                namespace={["test"]}
                enableClipboard={copy => {
                    expect(copy.src.test).to.equal(input_src.test)
                    //increment counter to assert that callback was called
                    callback_counter++
                }}
                onAdd={false}
                onDelete={false}
                rjvId={rjvId}
            />
        )
        expect(wrapper.find(".copy-to-clipboard-container")).to.have.length(1)
        expect(wrapper.find(".copy-icon")).to.have.length(2)

        document.execCommand = mock => {}
        wrapper
            .find(".copy-icon")
            .first()
            .simulate("click")
        //verify that callback was called
        expect(callback_counter).to.equal(1)
    })

    it("ObjectMeta clipboard click without copy callback", function() {
        const wrapper = mount(
            <ObjectMeta
                src={{ test: true }}
                size={1}
                theme="rjv-default"
                enableClipboard={true}
                onAdd={false}
                onDelete={false}
                rjvId={rjvId}
            />
        )
        expect(wrapper.find(".copy-to-clipboard-container")).to.have.length(1)
        expect(wrapper.find(".copy-icon")).to.have.length(2)
    })
})
