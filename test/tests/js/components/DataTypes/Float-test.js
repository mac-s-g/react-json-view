import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonFloat from '/react/src/js/components/DataTypes/Float';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';

describe('<JsonFloat />', function () {
    const rjvId = 1;

    it('float component should have a data type label', function () {
        const wrapper = shallow(
            <JsonFloat
            value={1.25}
            displayDataTypes={true}
            rjvId={rjvId}
            theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

});