import React from "react"
import { expect } from "chai"

import { toType, isTheme } from "./../../../../src/js/helpers/util"

describe("toType", function() {
    it("toType object", function() {
        let test = { a: true }
        expect(toType(test)).to.equal("object")
    })

    it("toType string", function() {
        let test = "test"
        expect(toType(test)).to.equal("string")
    })

    it("toType string", function() {
        let test = false
        expect(toType(test)).to.equal("boolean")
    })

    it("toType date", function() {
        let test = new Date()
        expect(toType(test)).to.equal("date")
    })

    it("toType float", function() {
        let test = -3.14156
        expect(toType(test)).to.equal("float")
    })

    it("toType function", function() {
        let test = () => {}
        expect(toType(test)).to.equal("function")
    })

    it("toType integer", function() {
        let test = 5
        expect(toType(test)).to.equal("integer")
    })

    it("toType NaN", function() {
        let test = NaN
        expect(toType(test)).to.equal("nan")
    })

    it("toType null", function() {
        let test = null
        expect(toType(test)).to.equal("null")
    })

    it("toType regexp", function() {
        let test = /[0-9]/
        expect(toType(test)).to.equal("regexp")
    })

    it("toType regexp", function() {
        let test = undefined
        expect(toType(test)).to.equal("undefined")
    })
})

describe("isTheme", function() {
    it("isTheme valid theme", function() {
        let test = {
            scheme: "rjv-grey",
            author: "mac gainor",
            base00: "rgba(1, 1, 1, 0)",
            base01: "rgba(1, 1, 1, 0.1)",
            base02: "rgba(0, 0, 0, 0.2)",
            base03: "rgba(1, 1, 1, 0.3)",
            base04: "rgba(0, 0, 0, 0.4)",
            base05: "rgba(1, 1, 1, 0.5)",
            base06: "rgba(1, 1, 1, 0.6)",
            base07: "rgba(1, 1, 1, 0.7)",
            base08: "rgba(1, 1, 1, 0.8)",
            base09: "rgba(1, 1, 1, 0.8)",
            base0A: "rgba(1, 1, 1, 0.8)",
            base0B: "rgba(1, 1, 1, 0.8)",
            base0C: "rgba(1, 1, 1, 0.8)",
            base0D: "rgba(1, 1, 1, 0.8)",
            base0E: "rgba(1, 1, 1, 0.8)",
            base0F: "rgba(1, 1, 1, 0.8)"
        }
        expect(isTheme(test)).to.equal(true)
    })

    it("isTheme invalid theme", function() {
        let test = {
            scheme: "rjv-grey",
            author: "mac gainor",
            base00: "rgba(1, 1, 1, 0)",
            base01: "rgba(1, 1, 1, 0.1)",
            base02: "rgba(0, 0, 0, 0.2)",
            base03: "rgba(1, 1, 1, 0.3)",
            base04: "rgba(0, 0, 0, 0.4)",
            base05: "rgba(1, 1, 1, 0.5)",
            base06: "rgba(1, 1, 1, 0.6)",
            base08: "rgba(1, 1, 1, 0.8)",
            base09: "rgba(1, 1, 1, 0.8)",
            base0A: "rgba(1, 1, 1, 0.8)",
            base0B: "rgba(1, 1, 1, 0.8)",
            base0C: "rgba(1, 1, 1, 0.8)",
            base0D: "rgba(1, 1, 1, 0.8)",
            base0E: "rgba(1, 1, 1, 0.8)",
            base0F: "rgba(1, 1, 1, 0.8)"
        }
        expect(isTheme(test)).to.equal(false)
    })

    it("isTheme object", function() {
        let test = { a: true }
        expect(isTheme(test)).to.equal(false)
    })

    it("isTheme number", function() {
        let test = 50
        expect(isTheme(test)).to.equal(false)
    })
})
