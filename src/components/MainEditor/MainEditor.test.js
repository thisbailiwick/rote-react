import React from 'react';
import { shallow } from 'enzyme';
import MainEditor from './MainEditor';

describe('<MainEditor />', () => {
  test('renders', () => {
    const wrapper = shallow(<MainEditor />);
    expect(wrapper).toMatchSnapshot();
  });
});
