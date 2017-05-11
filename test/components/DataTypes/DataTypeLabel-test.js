import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import DataTypeLabel from './../../../src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from './../../../src/js/stores/ConfigStore';

describe('<DataTypeLabel />', function () {
    const rjvId = 1;

    it('DataTypeLabel should exist when displayDataTypes is true', function () {
        ConfigStore.set(rjvId, 'displayDataTypes', true);
        const wrapper = shallow(
            <DataTypeLabel type_name='test' rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(0);
    });

    it('DataTypeLabel should not exist when displayDataTypes is false', function () {
        ConfigStore.set(rjvId, 'displayDataTypes', false);
        const wrapper = shallow(
            <DataTypeLabel type_name='test' rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find('.data-type-label.hidden')).to.have.length(1);
    });

});