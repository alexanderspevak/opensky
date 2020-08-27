import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a list', () => {
  expect(wrapped.find('li').length).toEqual(2);
});
