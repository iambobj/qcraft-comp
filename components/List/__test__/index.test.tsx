import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import List from '../index';

mountTest(List);

describe('List', () => {
  it('render button count correctly', () => {
    const component = mount(<List />);

    expect(component.find('h3').text()).toBe('This is List');
  });
});
