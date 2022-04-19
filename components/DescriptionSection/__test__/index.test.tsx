import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import DescriptionSection from '../index';

mountTest(DescriptionSection);

describe('DescriptionSection', () => {
  it('render button count correctly', () => {
    const component = mount(<DescriptionSection />);

    expect(component.find('h3').text()).toBe('This is DescriptionSection');
  });
});
