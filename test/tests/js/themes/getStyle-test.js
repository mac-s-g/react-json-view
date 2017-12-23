import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"

import getStyle from "./../../../../src/js/themes/getStyle"

describe("getStyle", function() {
    const rjvId = 1

    it("test that style is returned", function() {
        let style = getStyle("rjv-default", "app-container")
        expect(style.style.cursor).to.equal("default")
    })

    it("test objectKeyVal return", function() {
        let style = getStyle("rjv-default", "objectKeyVal", { paddingLeft: 10 })
        expect(style.style).to.exist
    })

    it('test "none" theme', function() {
        let style = getStyle("none", "app-container")
        expect(style.style).to.exist
    })

    it("test theme not set (NOTICE OUTPUT EXPECTED)", function() {
        let style = getStyle(false, "app-container")
        expect(style.style).to.exist
    })
})
