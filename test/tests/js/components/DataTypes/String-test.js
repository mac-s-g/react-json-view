import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import JsonString from '/react/src/js/components/DataTypes/String';
import DataTypeLabel from '/react/src/js/components/DataTypes/DataTypeLabel';
import ConfigStore from '/react/src/js/stores/ConfigStore';

describe('<JsonString />', function () {

    it('string component should have a data type label', function () {
        const rjvId = 1;
        ConfigStore.set(rjvId, 'displayDataTypes', true);
        const wrapper = shallow(
            <JsonString value="test" rjvId={rjvId} theme='rjv-default'/>
        );
        expect(wrapper.find(DataTypeLabel)).to.have.length(1);
    });

    it('string with hidden data type', function () {
        const rjvId = 1;
        ConfigStore.set(rjvId, 'displayDataTypes', false);
        const props = {
            value: 'test',
            rjvId: 1,
            theme: 'rjv-default'
        }
        const component = shallow(
            <JsonString {...props}/>
        ).render();
        expect(
            component.find(
                '.data-type-label.hidden'
            )
        ).to.have.length(1);
    });

    it('string displaying data type', function () {
        const rjvId = 1;
        ConfigStore.set(rjvId, 'displayDataTypes', false);
        const props = {
            value: 'test',
            rjvId: 1,
            theme: 'rjv-default'
        }
        const component = shallow(
            <JsonString {...props}/>
        ).render();
        expect(
            component.find(
                '.data-type-label'
            )
        ).to.have.length(1);
    });

});