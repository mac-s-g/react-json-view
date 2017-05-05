import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import rjvString from './../../../src/js/components/DataTypes/String';

describe('<rjvString />', function () {
  it('string component should have one child div', function () {
    const wrapper = shallow(<rjvString />);
    expect(wrapper).to.have.length(1);
  });
});