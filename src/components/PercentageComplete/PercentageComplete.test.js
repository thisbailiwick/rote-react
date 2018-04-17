import React from 'react';
import { shallow } from 'enzyme';
import PercentageComplete from './PercentageComplete';

describe('<PercentageComplete />', () => {
  test('renders', () => {
    const wrapper = shallow(<PercentageComplete />);
    expect(wrapper).toMatchSnapshot();
  });
});
