import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"

import ObjectAttributes from "./../../../../src/js/stores/ObjectAttributes"

describe("ObjectAttributes", function() {
    it("set a value in empty store", function() {
        const rjvId = 10,
            name = "test_name",
            key = "test_key",
            value = "test_value"

        ObjectAttributes.set(rjvId, name, key, value)
        expect(ObjectAttributes.get(rjvId, name, key, value)).to.equal(value)
    })

    it("set a value that was already set", function() {
        const rjvId = 20,
            name = "test_name",
            key = "test_key",
            value = "test_value"

        ObjectAttributes.set(rjvId, name, key, value)
        ObjectAttributes.set(rjvId, name, key, value)
        expect(ObjectAttributes.get(rjvId, name, key, value)).to.equal(value)
    })
})
