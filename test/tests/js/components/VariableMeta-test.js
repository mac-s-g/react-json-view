import React from 'react';
import { shallow, render } from 'enzyme';
import {expect} from 'chai';

import VariableMeta from '/react/src/js/components/VariableMeta';
import ConfigStore from '/react/src/js/stores/ConfigStore';


describe('<VariableMeta />', function () {
    const rjvId = 1;

    it('VariableMeta clipboard should exist', function () {
        ConfigStore.set(rjvId, 'enableClipboard', true);
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.copy-to-clipboard-container').props().style.display
        ).to.equal('inline-block');
    });


    it('VariableMeta clipboard should not exist', function () {
        ConfigStore.set(rjvId, 'enableClipboard', false);
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.copy-to-clipboard-container').props().style.display
        ).to.equal('none');
    });


    it('VariableMeta size should exist', function () {
        ConfigStore.set(rjvId, 'displayObjectSize', true);
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.object-size')
        ).to.have.length(1);
    });


    it('VariableMeta size should not exist', function () {
        ConfigStore.set(rjvId, 'displayObjectSize', false);
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.object-size')
        ).to.have.length(0);
    });

});