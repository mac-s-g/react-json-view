import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonBoolean from '/react/src/js/components/DataTypes/Boolean';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from '/react/src/js/stores/ConfigStore';

describe('<JsonBoolean />', function () {
    const rjvId = 1;
    ConfigStore.set(rjvId, 'displayDataTypes', true);

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean value={true} rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

    it('bool component should have a data type label: True', function () {
        const wrapper = shallow(
            <JsonBoolean value={false} rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

});