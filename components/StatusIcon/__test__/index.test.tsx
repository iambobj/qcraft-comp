import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import StatusIcon from '../index';

mountTest(StatusIcon);

describe('StatusIcon', () => {
  it('render button count correctly', () => {
    const component = mount(<StatusIcon />);

    expect(component.find('h3').text()).toBe('This is StatusIcon');
  });
});
