import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import QDrawer from '../index';

mountTest(QDrawer);

describe('QDrawer', () => {
  it('render button count correctly', () => {
    const component = mount(<QDrawer />);

    expect(component.find('h3').text()).toBe('This is QDrawer');
  });
});
