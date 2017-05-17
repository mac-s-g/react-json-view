import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonUndefined from '/react/src/js/components/DataTypes/Undefined';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';

describe('<JsonUndefined />', function () {
    const rjvId = 1;

    it('Undefined component should no data type label', function () {
        const wrapper = shallow(
            <JsonUndefined
            rjvId={rjvId}
            displayDataTypes={true}
            theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(0);
    });

});