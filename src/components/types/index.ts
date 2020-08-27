export type FlightData = {
  icao24?: string;
  firstSeen?: number;
  estArrivalAirport?: number;
  lastSeen?: number;
  callsign?: string;
  estDepartureAirport?: string;
};

export type FlightDirection = 'arrival' | 'departure';
