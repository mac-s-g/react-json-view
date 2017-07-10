import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonFunction from '/react/src/js/components/DataTypes/Function';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';

import AttributeStore from '/react/src/js/stores/ObjectAttributes';

describe('<JsonFunction />', function () {
    const rjvId = 1;

    it('function component should have a data type label', function () {
        const wrapper = shallow(
            <JsonFunction
            value={function(){}}
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

    it('function component expanded', function () {
        AttributeStore.set(
            rjvId,
            'function-test',
            'collapsed',
            false
        );

        const wrapper = shallow(
            <JsonFunction
            value={function(){}}
            namespace='function-test'
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        );
        expect(wrapper.find('.function-collapsed')).to.have.length(0);
    });

    it('function component collapsed', function () {
        AttributeStore.set(
            rjvId,
            'function-test',
            'collapsed',
            true
        );

        const wrapper = shallow(
            <JsonFunction
            value={function(){}}
            namespace='function-test'
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        );

        expect(wrapper.find('.function-collapsed')).to.have.length(1);
    });

});