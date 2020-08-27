import React from 'react';
import { FlightData, FlightDirection } from './types';

interface Props {
  flightDirection: FlightDirection;
  flightData: FlightData[];
}

export default ({ flightDirection, flightData }: Props) => {
  const sortedFlightData = flightData.sort((a, b): number => {
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
          </tr>
        </thead>

        <tbody>
          {sortedFlightData.map(({ icao24, firstSeen, callsign, lastSeen }) => {
            return (
              <tr key={callsign + '' + firstSeen}>
                <td>{icao24}</td>
                <td>{callsign}</td>
                <td>
                  {lastSeen && new Date(lastSeen * 1000).toLocaleTimeString()}
                </td>
                <td>
                  {firstSeen && new Date(firstSeen * 1000).toLocaleTimeString()}
                </td>
              </tr>
            );
          })}
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
