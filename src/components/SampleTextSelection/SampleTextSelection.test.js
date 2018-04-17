import React from 'react';
import { shallow } from 'enzyme';
import SampleTextSelection from './SampleTextSelection';

describe('<SampleTextSelection />', () => {
  test('renders', () => {
    const wrapper = shallow(<SampleTextSelection />);
    expect(wrapper).toMatchSnapshot();
  });
});
