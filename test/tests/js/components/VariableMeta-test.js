import React from 'react';
import { shallow, render } from 'enzyme';
import {expect} from 'chai';

import VariableMeta from '/react/src/js/components/VariableMeta';


describe('<VariableMeta />', function () {
    const rjvId = 1;

    it('VariableMeta clipboard should exist', function () {
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            enableClipboard={true}
            onAdd={false}
            onDelete={false}
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.copy-to-clipboard-container').props().style.display
        ).to.equal('none');
    });


    it('VariableMeta clipboard should not exist', function () {
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            enableClipboard={false}
            onAdd={false}
            onDelete={false}
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.copy-to-clipboard-container').props().style.display
        ).to.equal('none');
    });


    it('VariableMeta size should exist', function () {
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            displayObjectSize={true}
            onAdd={false}
            onDelete={false}
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.object-size')
        ).to.have.length(1);
    });


    it('VariableMeta size should not exist', function () {
        const wrapper = shallow(
            <VariableMeta
            src={{test:true}}
            size={1}
            theme='rjv-default'
            displayObjectSize={false}
            onAdd={false}
            onDelete={false}
            rjvId={rjvId} />
        );
        expect(
            wrapper.find('.object-size')
        ).to.have.length(0);
    });

});