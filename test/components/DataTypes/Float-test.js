import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonFloat from './../../../src/js/components/DataTypes/Float';
import DataTypeLabel from './../../../src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from './../../../src/js/stores/ConfigStore';

describe('<JsonFloat />', function () {
    const rjvId = 1;
    ConfigStore.set(rjvId, 'displayDataTypes', true);

    it('float component should have a data type label', function () {
        const wrapper = shallow(
            <JsonFloat value={1.25} rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

});