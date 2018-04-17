import React from 'react';
import { shallow } from 'enzyme';
import EditorModeSelection from './EditorModeSelection';

describe('<EditorModeSelection />', () => {
  test('renders', () => {
    const wrapper = shallow(<EditorModeSelection />);
    expect(wrapper).toMatchSnapshot();
  });
});
