import React from "react"
import { shallow, render, mount } from "enzyme"
import { expect } from "chai"

import Index from "./../../../../src/js/index"
import {
    CircleMinus,
    CirclePlus,
    Clippy,
    RemoveCircle,
    AddCircle,
    Add,
    Edit,
    CheckCircle,
    SquarePlus,
    SquareMinus,
    ArrowDown,
    ArrowRight, CancelIcon, RemoveIcon
} from './../../../../src/js/components/icons';

describe("svg icons", function() {
    it("<CircleMinus /> sanity check", function() {
        const wrapper = shallow(<CircleMinus />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<CirclePlus /> sanity check", function() {
        const wrapper = shallow(<CirclePlus />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<SquarePlus /> sanity check", function() {
        const wrapper = shallow(<SquarePlus />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<SquareMinus /> sanity check", function() {
        const wrapper = shallow(<SquareMinus />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<ArrowDown /> sanity check", function() {
        const wrapper = shallow(<ArrowDown />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<ArrowRight /> sanity check", function() {
        const wrapper = shallow(<ArrowRight />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<Clippy /> sanity check", function() {
        const wrapper = shallow(<Clippy />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<RemoveIcon /> sanity check", function() {
        const wrapper = shallow(<RemoveIcon />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<CancelIcon /> sanity check", function() {
        const wrapper = shallow(<CancelIcon />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<AddCircle /> sanity check", function() {
        const wrapper = shallow(<AddCircle />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<Add /> sanity check", function() {
        const wrapper = shallow(<Add />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<Edit /> sanity check", function() {
        const wrapper = shallow(<Edit />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("<CheckCircle /> sanity check", function() {
        const wrapper = shallow(<CheckCircle />)
        expect(wrapper.find("svg").length).to.equal(1)
    })

    it("icon with color", function() {
        const wrapper = shallow(<CheckCircle style={{ color: "green" }} />)
        expect(wrapper.find("svg").length).to.equal(1)
    })
})
