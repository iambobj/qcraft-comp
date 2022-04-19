import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import MultipleDatePicker from '../index';

mountTest(MultipleDatePicker);

describe('MultipleDatePicker', () => {
  it('render button count correctly', () => {
    const component = mount(<MultipleDatePicker />);

    expect(component.find('h3').text()).toBe('This is MultipleDatePicker');
  });
});
