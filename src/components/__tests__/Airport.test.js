import React from 'react';
import { shallow } from 'enzyme';
import Airport from '../Airport';
import DatePicker from 'react-modern-calendar-datepicker';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Airport />)
    .first()
    .shallow();
});

it('renders buttons', () => {
  expect(wrapped.find('button').length).toEqual(2);
});

it('renders a calendar', () => {
  expect(wrapped.find(DatePicker).length).toEqual(1);
});

it('renders input form', () => {
  expect(wrapped.find('input').length).toEqual(1);
});
