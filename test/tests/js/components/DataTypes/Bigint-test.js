import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import JsonBigint from '../../../../../src/js/components/DataTypes/Bigint';

describe('<Bigint />', function () {
    const rjvId = 1;

    it('bigint component should have a data type label', function () {
        const wrapper = mount(
            <JsonBigint
                value={BigInt(100)}
                displayDataTypes={true}
                rjvId={rjvId}
                theme="rjv-default"
            />
        );
        expect(wrapper.find('.data-type-label')).to.have.length(1);
    });

    it('bigint component should not have a data type label', function () {
        const wrapper = mount(
            <JsonBigint
                value={BigInt(100)}
                displayDataTypes={false}
                rjvId={rjvId}
                theme="rjv-default"
            />
        );
        expect(wrapper.find('.data-type-label')).to.have.length(0);
    });
});
