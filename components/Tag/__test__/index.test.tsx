import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Tag from '../index';

mountTest(Tag);

describe('Tag', () => {
  it('render button count correctly', () => {
    const component = mount(<Tag />);

    expect(component.find('h3').text()).toBe('This is Tag');
  });
});
