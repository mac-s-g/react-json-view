import React from "react"
import { render, shallow } from "enzyme"
import { expect } from "chai"

import {
    ExpandedIcon,
    CollapsedIcon
} from "./../../../../src/js/components/ToggleIcons"

import {
    CircleMinus,
    CirclePlus,
    SquareMinus,
    SquarePlus,
    ArrowRight,
    ArrowDown
} from "./../../../../src/js/components/icons"

describe("<ToggleIcons />", function() {
    it("ExpandedIcon mount", function() {
        const wrapper = shallow(<ExpandedIcon theme="rjv-default" />)
        expect(wrapper.find(".expanded-icon")).to.have.length(1)
    })

    it("CollapsedIcon mount", function() {
        const wrapper = shallow(<CollapsedIcon theme="rjv-default" />)
        expect(wrapper.find(".collapsed-icon")).to.have.length(1)
    })

    it("ExpandedIcon with triangle style", function() {
        const wrapper = shallow(
            <ExpandedIcon theme="rjv-default" iconStyle="triangle" />
        )
        expect(wrapper.type()).to.equal(ArrowDown)
    })

    it("ExpandedIcon with square style", function() {
        const wrapper = shallow(
            <ExpandedIcon theme="rjv-default" iconStyle="square" />
        )
        expect(wrapper.type()).to.equal(SquareMinus)
    })

    it("ExpandedIcon with no style", function() {
        const wrapper = shallow(<ExpandedIcon theme="rjv-default" />)
        expect(wrapper.type()).to.equal(CircleMinus)
    })

    it("CollapsedIcon with triangle style", function() {
        const wrapper = shallow(
            <CollapsedIcon theme="rjv-default" iconStyle="triangle" />
        )
        expect(wrapper.type()).to.equal(ArrowRight)
    })

    it("CollapsedIcon with square style", function() {
        const wrapper = shallow(
            <CollapsedIcon theme="rjv-default" iconStyle="square" />
        )
        expect(wrapper.type()).to.equal(SquarePlus)
    })

    it("CollapsedIcon with no style", function() {
        const wrapper = shallow(<CollapsedIcon theme="rjv-default" />)
        expect(wrapper.type()).to.equal(CirclePlus)
    })
})
