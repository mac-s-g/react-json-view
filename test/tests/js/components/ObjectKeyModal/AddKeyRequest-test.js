import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import AddKeyRequest from "./../../../../../src/js/components/ObjectKeyModal/AddKeyRequest"
import ObjectAttributes from "./../../../../../src/js/stores/ObjectAttributes"

describe("<AddKeyRequest />", function() {
    const rjvId = 1

    it("AddKeyRequest should not render input when inactive", function() {
        ObjectAttributes.set(rjvId, "action", "new-key-request", {
            existing_value: { test: true },
            namespace: [],
            new_value: { test: null }
        })
        ObjectAttributes.set(rjvId, "global", "src", { test: true })
        const wrapper = mount(
            <AddKeyRequest active={false} theme="rjv-default" rjvId={rjvId} />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(0)
    })

    it("AddKeyRequest should render input when active", function() {
        ObjectAttributes.set(rjvId, "action", "new-key-request", {
            existing_value: { test: true },
            namespace: [],
            new_value: { test: null }
        })
        ObjectAttributes.set(rjvId, "global", "src", { test: true })
        const wrapper = mount(
            <AddKeyRequest active={true} theme="rjv-default" rjvId={rjvId} />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
    })
})
