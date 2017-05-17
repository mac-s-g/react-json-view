import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonBoolean from '/react/src/js/components/DataTypes/Boolean';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';

describe('<JsonBoolean />', function () {
    const rjvId = 1;

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean
            value={true}
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        ).render();
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(0);
    });

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean
            value={true}
            rjvId={rjvId}
            displayDataTypes={false}
            theme='rjv-default'/>
        ).render();
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(1);
    });

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean
            value={false}
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        ).render();
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(0);
    });

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean
            value={false}
            rjvId={rjvId}
            displayDataTypes={false}
            theme='rjv-default'/>
        ).render();
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(1);
    });

});