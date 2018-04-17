import React from 'react';
import { shallow } from 'enzyme';
import BeginButtons from './BeginButtons';

describe('<BeginButtons />', () => {
  test('renders', () => {
    const wrapper = shallow(<BeginButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
