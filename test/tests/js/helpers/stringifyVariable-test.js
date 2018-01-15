import React from "react"
import { expect } from "chai"

import stringifyVariable from "./../../../../src/js/helpers/stringifyVariable"

describe("stringifyVariable", function() {
    it("stringifyVariable object", function() {
        let test = { a: true }
        expect(stringifyVariable(test)).to.equal(
            JSON.stringify(test, null, "  ")
        )
    })

    it("stringifyVariable array", function() {
        let test = [1, 2, 3]
        expect(stringifyVariable(test)).to.equal(
            JSON.stringify(test, null, "  ")
        )
    })

    it("stringifyVariable integers", function() {
        let test = 5
        expect(stringifyVariable(test)).to.equal("5")

        test = -15
        expect(stringifyVariable(test)).to.equal("-15")

        test = 0
        expect(stringifyVariable(test)).to.equal("0")
    })

    it("stringifyVariable floats", function() {
        let test = 1.123
        expect(stringifyVariable(test)).to.equal("1.123")

        test = -10.123
        expect(stringifyVariable(test)).to.equal("-10.123")
    })

    it("stringifyVariable booleans", function() {
        let test = true
        expect(stringifyVariable(test)).to.equal("true")

        test = false
        expect(stringifyVariable(test)).to.equal("false")
    })

    it("stringifyVariable NaN", function() {
        let test = NaN
        expect(stringifyVariable(test)).to.equal("NaN")
    })

    it("stringifyVariable null", function() {
        let test = null
        expect(stringifyVariable(test)).to.equal("null")
    })

    it("stringifyVariable undefined", function() {
        let test = undefined
        expect(stringifyVariable(test)).to.equal("undefined")
    })

    it("stringifyVariable strings", function() {
        let test = "test string"
        expect(stringifyVariable(test)).to.equal("test string")

        test = ""
        expect(stringifyVariable(test)).to.equal("")
    })

    it("stringifyVariable functions", function() {
        let test = function(e) {}
        expect(stringifyVariable(test)).to.equal("function test(e) {}")

        test = e => {}
        expect(stringifyVariable(test)).to.equal("function test(e) {}")
    })

    it("stringifyVariable date", function() {
        let test = new Date()
        expect(stringifyVariable(test)).to.equal(test.toString())
    })

    it("stringifyVariable regex", function() {
        let regex = /[0-9]/gi
        expect(stringifyVariable(regex)).to.equal(regex.toString())
    })
})
