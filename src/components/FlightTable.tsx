import React from 'react';
import { FlightData, FlightDirection } from './types';
import { BlueRow } from './styled';

interface Props {
  flightDirection: FlightDirection;
  flightData: FlightData[];
}

export default ({ flightDirection, flightData }: Props) => {
  const sortedFlightData = [...flightData].sort((a, b): number => {
    const sortKey = flightDirection === 'departure' ? 'firstSeen' : 'lastSeen';

    if (!a[sortKey]) return 1;
    if (!b[sortKey]) return -1;
    return a[sortKey]! > b[sortKey]! ? 1 : -1;
  });

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>icao 24</th>
            <th>Call sign</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>
              {flightDirection === 'departure'
                ? 'Destination airport'
                : 'Departure airport'}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedFlightData.map(
            (
              {
                icao24 = '',
                firstSeen = 0,
                callsign = 0,
                lastSeen = 0,
                estArrivalAirport = '',
                estDepartureAirport = ''
              },
              index
            ) => {
              const CustomRow = index % 2 === 1 ? BlueRow : 'tr';
              return (
                <CustomRow key={callsign + '_' + firstSeen}>
                  <td>{icao24}</td>
                  <td>{callsign}</td>
                  <td>
                    {lastSeen && new Date(lastSeen * 1000).toLocaleTimeString()}
                  </td>
                  <td>
                    {firstSeen &&
                      new Date(firstSeen * 1000).toLocaleTimeString()}
                  </td>
                  <td>
                    {flightDirection === 'departure'
                      ? estArrivalAirport
                      : estDepartureAirport}
                  </td>
                </CustomRow>
              );
            }
          )}
        </tbody>
      </table>
    );
  };
  return (
    <div>
      <h3>{`${flightDirection.toLocaleUpperCase()}S:`}</h3>
      {renderTable()}
    </div>
  );
};
