import React, { ReactElement } from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
import { FlightDirection } from '../types';

export interface StorageProps {
  flightDay: DayValue | null;
  storeFlightDay: (flightDay: DayValue) => void;
  storedDirection: FlightDirection;
  storeFlightDirection: (flightDirection: FlightDirection) => void;
}

type ReturnComponent = <T extends StorageProps>(props: T) => ReactElement;

export default (Component: ReturnComponent): ReturnComponent => {
  const storedFlightDay = localStorage.getItem('flightDay');
  const flightDay = storedFlightDay ? JSON.parse(storedFlightDay) : null;

  const storeFlightDay = (flightDay: DayValue) => {
    localStorage.setItem('flightDay', JSON.stringify(flightDay));
  };

  const flightDirection =
    (localStorage.getItem('flightDirection') as FlightDirection) || 'arrival';
  const storeFlightDirection = (flightDirection: FlightDirection) => {
    localStorage.setItem('flightDirection', flightDirection);
  };

  return (props: StorageProps) => {
    return (
      <Component
        {...props}
        flightDay={flightDay}
        storeFlightDay={storeFlightDay}
        storedDirection={flightDirection}
        storeFlightDirection={storeFlightDirection}
      />
    );
  };
};
