import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonDate from '/react/src/js/components/DataTypes/Date';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';

describe('<JsonDate />', function () {
    const rjvId = 1;

    it('date component should have a data type label', function () {
        const wrapper = shallow(
            <JsonDate
            value={new Date()}
            displayDataTypes={true}
            rjvId={rjvId}
            theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

});