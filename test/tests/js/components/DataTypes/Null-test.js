import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonNull from '/react/src/js/components/DataTypes/Null';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from '/react/src/js/stores/ConfigStore';

describe('<JsonNull />', function () {
    const rjvId = 1;
    ConfigStore.set(rjvId, 'displayDataTypes', true);

    it('Null component should no data type label', function () {
        const wrapper = shallow(
            <JsonNull rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(0);
    });

});