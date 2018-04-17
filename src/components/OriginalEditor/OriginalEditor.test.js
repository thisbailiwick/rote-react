import React from 'react';
import { shallow } from 'enzyme';
import OriginalEditor from './OriginalEditor';

describe('<OriginalEditor />', () => {
  test('renders', () => {
    const wrapper = shallow(<OriginalEditor />);
    expect(wrapper).toMatchSnapshot();
  });
});
