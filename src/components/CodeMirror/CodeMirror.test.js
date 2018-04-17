import React from 'react';
import { shallow } from 'enzyme';
import CodeMirror from './CodeMirror';

describe('<CodeMirror />', () => {
  test('renders', () => {
    const wrapper = shallow(<CodeMirror />);
    expect(wrapper).toMatchSnapshot();
  });
});
