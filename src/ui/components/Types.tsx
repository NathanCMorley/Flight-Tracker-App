export interface FlightRouteResponse {
  response: {
    flightroute: FlightRoute;
  };
}

export interface FlightRoute {
  callsign: string;
  callsign_icao: string;
  callsign_iata: string;
  airline: Airline;
  origin: Airport;
  destination: Airport;
}

export interface Airline {
  name: string;
  icao: string;
  iata: string;
  country: string;
  country_iso: string;
  callsign: string;
}

export interface Airport {
  country_iso_name: string;
  country_name: string;
  elevation: number;
  iata_code: string;
  icao_code: string;
  latitude: number;
  longitude: number;
  municipality: string;
  name: string;
}

export interface Data {
  icao: string;
  callsign: string;
  baroAltitude: number;
  lat: number;
  lon: number;
  heading: number;
  speed: number;
  verticalRate: number;
  squawk: string;
  onGround: boolean;
  isMilitary: boolean;
  positionTime: number; // epoch ms
}
