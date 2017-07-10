import React from 'react';
import { shallow, render, mount } from 'enzyme';
import {expect} from 'chai';

import Index from '/react/src/js/index';
import {
    CircleMinus,
    CirclePlus,
    Clippy,
    RemoveCircle,
    AddCircle,
    Add,
    Edit,
    CheckCircle
} from '/react/src/js/components/icons';


describe('svg icons', function () {

    it('<CircleMinus /> sanity check', function () {
        const wrapper = shallow(
            <CircleMinus />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<CirclePlus /> sanity check', function () {
        const wrapper = shallow(
            <CirclePlus />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<Clippy /> sanity check', function () {
        const wrapper = shallow(
            <Clippy />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<RemoveCircle /> sanity check', function () {
        const wrapper = shallow(
            <RemoveCircle />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<AddCircle /> sanity check', function () {
        const wrapper = shallow(
            <AddCircle />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<Add /> sanity check', function () {
        const wrapper = shallow(
            <Add />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<Edit /> sanity check', function () {
        const wrapper = shallow(
            <Edit />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('<CheckCircle /> sanity check', function () {
        const wrapper = shallow(
            <CheckCircle />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

    it('icon with color', function () {
        const wrapper = shallow(
            <CheckCircle style={{color: 'green'}} />
        );
        expect(
            wrapper.find('svg').length
        ).to.equal(1);
    });

});
