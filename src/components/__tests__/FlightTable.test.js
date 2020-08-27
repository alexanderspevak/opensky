import React from 'react';
import { shallow } from 'enzyme';
import FlightTable from '../FlightTable';
import { BlueRow } from '../styled';

let wrapped;

beforeEach(() => {
  wrapped = shallow(
    <FlightTable
      flightDirection='arrival'
      flightData={[
        { callsign: 'abc', firstSeen: 1, lastSeen: 4, icao24: 'ABCD' },
        { callsign: 'efg', firstSeen: 2, lastSeen: 3, icao24: 'EFGH' }
      ]}
    />
  );
});

it('renders table with correct size', () => {
  const rows = wrapped.find('tr');
  expect(rows.length).toEqual(2);
  expect(rows.last().find('td').length).toEqual(5);
});

it('correctly sorts data', () => {
  let rows = wrapped.find(BlueRow);
  expect(
    rows
      .last()
      .find('td')
      .first()
      .text()
  ).toEqual('ABCD');

  wrapped = shallow(
    <FlightTable
      flightDirection='departure'
      flightData={[
        { callsign: 'abc', firstSeen: 1, lastSeen: 4, icao24: 'ABCD' },
        { callsign: 'efg', firstSeen: 2, lastSeen: 3, icao24: 'EFGH' }
      ]}
    />
  );

  rows = wrapped.find(BlueRow);
  expect(
    rows
      .last()
      .find('td')
      .first()
      .text()
  ).toEqual('EFGH');
});
