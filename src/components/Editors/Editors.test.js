import React from 'react';
import { shallow } from 'enzyme';
import Editors from './Editors';

describe('<Editors />', () => {
  test('renders', () => {
    const wrapper = shallow(<Editors />);
    expect(wrapper).toMatchSnapshot();
  });
});
