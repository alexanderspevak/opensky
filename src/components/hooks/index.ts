import { useState, useEffect, useCallback } from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
import { FlightData, FlightDirection } from '../types';
import { PRAGUE_AIRPORT_CODE, SECONDS_IN_DAY } from '../constants';
import opensky from '../../apis/opensky';

export const useOpenSky = (flightDirection: FlightDirection, day: DayValue) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<string>('');
  const [data, setFlightData] = useState<FlightData[]>([]);

  const memoizedGetData = useCallback(
    (flightDirection: FlightDirection, day: DayValue) => {
      const getData = async (
        direction: string,
        day: DayValue
      ): Promise<void> => {
        if (!day) return;

        const begin =
          new Date(day.year, day.month - 1, day.day).getTime() / 1000;
        const airport = PRAGUE_AIRPORT_CODE;
        const end = begin + SECONDS_IN_DAY;

        try {
          setLoading('Loading...');
          const { data } = await opensky.get<FlightData[]>(
            `/flights/${direction}`,
            {
              params: {
                begin,
                end,
                airport
              }
            }
          );

          setFlightData(data);
          setErrorMessage('');
          setLoading('');
        } catch (e) {
          setLoading('');
          setErrorMessage(`no ${flightDirection} found on this date`);
          setFlightData([]);
        }
      };
      getData(flightDirection, day);
    },
    []
  );

  useEffect(() => {
    memoizedGetData(flightDirection, day);
  }, [flightDirection, day, memoizedGetData]);

  return { getData: memoizedGetData, loading, data, errorMessage };
};
