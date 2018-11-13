import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import EditKeyRequest from "./../../../../../src/js/components/ObjectKeyModal/EditKeyRequest"
import ObjectAttributes from "./../../../../../src/js/stores/ObjectAttributes"

describe("<EditKeyRequest />", function() {
    const rjvId = 1

    it("EditKeyRequest should not render input when inactive", function() {
        ObjectAttributes.set(rjvId, "action", "new-key-request", {
            existing_value: { test: true },
            namespace: [],
            new_value: { test: null }
        })
        ObjectAttributes.set(rjvId, "global", "src", { test: true })
        const wrapper = mount(
            <EditKeyRequest active={false} theme="rjv-default" rjvId={rjvId} />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(0)
    })

    it("EditKeyRequest should render input when active", function() {
        ObjectAttributes.set(rjvId, "action", "new-key-request", {
            existing_value: { test: true },
            namespace: [],
            new_value: { test: null }
        })
        ObjectAttributes.set(rjvId, "global", "src", { test: true })
        const wrapper = mount(
            <EditKeyRequest active={true} theme="rjv-default" rjvId={rjvId} />
        )

        expect(wrapper.find(".key-modal-input").length).to.equal(1)
    })
})
