import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Select from '../index';

mountTest(Select);

describe('Select', () => {
  it('render button count correctly', () => {
    const component = mount(<Select />);

    expect(component.find('h3').text()).toBe('This is Select');
  });
});
