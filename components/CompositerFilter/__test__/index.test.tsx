import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import CompositerFilter from '../index';

mountTest(CompositerFilter);

describe('CompositerFilter', () => {
  it('render button count correctly', () => {
    const component = mount(<CompositerFilter />);

    expect(component.find('h3').text()).toBe('This is CompositerFilter');
  });
});
