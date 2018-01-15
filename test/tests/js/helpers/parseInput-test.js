import React from "react"
import { expect } from "chai"

import parseInput from "./../../../../src/js/helpers/parseInput"

describe("parseInput", function() {
    it("parseInput array", function() {
        expect(parseInput(JSON.stringify([1, 2, "test"])).type).to.equal(
            "array"
        )
    })

    it("parseInput object", function() {
        expect(parseInput(JSON.stringify({ test: true })).type).to.equal(
            "object"
        )
    })

    it("parseInput float", function() {
        expect(parseInput("5.22").type).to.equal("float")
    })

    it("parseInput date", function() {
        expect(parseInput("5/22").type).to.equal("date")
    })

    it("parseInput integer", function() {
        expect(parseInput("22").type).to.equal("integer")
    })

    it("parseInput NaN", function() {
        expect(parseInput("nan").type).to.equal("nan")

        expect(parseInput("NAN").type).to.equal("nan")
    })

    it("parseInput null", function() {
        expect(parseInput("nUlL").type).to.equal("null")
    })

    it("parseInput boolean", function() {
        expect(parseInput("true").type).to.equal("boolean")

        expect(parseInput("false").type).to.equal("boolean")
    })

    it("parseInput undefined", function() {
        expect(parseInput("undeFINEd").type).to.equal("undefined")
    })

    it("parseInput string", function() {
        expect(parseInput("test").type).to.equal(false)
    })

    it("parseInput regex", function() {
        expect(parseInput("/[0-9]/").type).to.equal(false)
    })
})
