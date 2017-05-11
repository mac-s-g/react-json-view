import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonFunction from './../../../src/js/components/DataTypes/Function';
import DataTypeLabel from './../../../src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from './../../../src/js/stores/ConfigStore';

describe('<JsonFunction />', function () {
    const rjvId = 1;
    ConfigStore.set(rjvId, 'displayDataTypes', true);

    it('function component should have a data type label', function () {
        const wrapper = shallow(
            <JsonFunction value={function(){}} rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

});