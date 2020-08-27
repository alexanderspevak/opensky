import React, { useEffect, useState } from 'react';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Warning } from './styled';
import { useOpenSky } from './hooks';
import FlightTable from './FlightTable';
import { FlightDirection, FlightData } from './types';
import storage, { StorageProps } from './hocs/storage';

const REDIRECT_INTERVAL = 30000;

const Airport = ({
  flightDay,
  storeFlightDay,
  storedDirection,
  storeFlightDirection
}: StorageProps) => {
  const [noFlightMessage, setNoFlightMessage] = useState<string>('');
  const [filteredData, setFilteredData] = useState<FlightData[]>([]);
  const [day, setDay] = useState<DayValue>(flightDay);
  const [direction, setFlightDirection] = useState<FlightDirection>(
    storedDirection
  );
  const [callsign, setCallsign] = useState<string>('');
  const { getData, data, errorMessage, loading } = useOpenSky(
    storedDirection,
    day
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (callsign) return;
      direction === 'arrival'
        ? setFlightDirection('departure')
        : setFlightDirection('arrival');
      getData(direction, day);
    }, REDIRECT_INTERVAL);

    return () => {
      clearTimeout(timerId);
    };
  }, [direction, day, callsign, getData]);

  const onDateChange = (day: DayValue) => {
    storeFlightDay(day);
    setDay(day);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const newDirection = direction === 'arrival' ? 'departure' : 'arrival';
    setFlightDirection(newDirection);
    storeFlightDirection(newDirection);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCallsign(event.target.value);
    if (noFlightMessage) setNoFlightMessage('');
    if (!event.target.value) {
      setFilteredData([]);
      getData(direction, day);
    }
  };

  const handleFilter = () => {
    if (!callsign) return;
    const upperCaseCallsign = callsign.toUpperCase();
    const filteredData = data.filter(flight =>
      flight.callsign ? flight.callsign!.trim() === upperCaseCallsign : false
    );
    if (filteredData.length) {
      setFilteredData(filteredData);
    } else {
      setNoFlightMessage(
        `No ${direction} with callsign "${callsign}" found on this day`
      );
    }
  };

  return (
    <div>
      <DatePicker value={day} onChange={onDateChange} />
      <button onClick={handleClick}>
        {direction === 'arrival'
          ? 'switch to departures'
          : 'switch to arrivals'}
      </button>
      <br />
      <input type='text' onChange={handleInput} value={callsign} />
      <button onClick={handleFilter}>Find flight</button>
      {errorMessage && <Warning>{errorMessage}</Warning>}
      {noFlightMessage && <Warning>{noFlightMessage}</Warning>}
      {loading && <h3>{loading}</h3>}
      {day && !loading && !errorMessage && (
        <FlightTable
          flightDirection={direction}
          flightData={filteredData.length ? filteredData : data}
        />
      )}
    </div>
  );
};

export default storage(Airport);
