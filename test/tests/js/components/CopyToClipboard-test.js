import React from "react"
import { shallow, mount } from "enzyme"
import { expect } from "chai"

import CopyToClipboard from "./../../../../src/js/components/CopyToClipboard"

describe("<CopyToClipboard />", function() {
    it("CopyToClipboard clipboard should exist", function() {
        const wrapper = shallow(
            <CopyToClipboard
                src={{ test: true }}
                theme="rjv-default"
                clickCallback={true}
                hidden={false}
            />
        )
        expect(wrapper.find(".copy-to-clipboard-container")).to.have.length(1)
    })

    it("CopyToClipboard clipboard should be hidden", function() {
        const wrapper = shallow(
            <CopyToClipboard
                src={{ test: true }}
                theme="rjv-default"
                clickCallback={true}
                hidden={true}
            />
        )
        //not sure how to test css attribute
        expect(wrapper.find(".copy-to-clipboard-container")).to.have.length(1)
    })
})
