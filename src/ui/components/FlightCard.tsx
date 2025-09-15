import { useState, useEffect } from "react";
import type { LatLngExpression } from "leaflet";

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

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3; // metres, Earth's radius
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

function Tracker() {
  const [regInput, setRegInput] = useState(""); // input field value
  const [reg, setReg] = useState(""); // actual reg used for fetching
  const [data, setData] = useState<Data[]>([]); // store fetched data
  const [data2, setData2] = useState<FlightRouteResponse>(); // store fetched data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE = "https://api.facha.dev";
  // Fetch aircraft data whenever `reg` changes
  const latLng: LatLngExpression = [51.505, -0.09]; // Default center
  latLng[0] = data[0]?.lat || latLng[0];
  useEffect(() => {
    if (!reg) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/v1/aircraft/live/reg/${reg}`);
      const data = (await response.json()) as Data[];
      setData(data);
      try {
        const response2 = await fetch(
          `https://api.adsbdb.com/v0/callsign/${data[0].callsign}`
        );
        const data2 = await response2.json();
        setData2(data2);
        console.log(data2);
      } catch (e) {
        setError("Failed to fetch flight route data.");
        setLoading(false);
        return;
      }

      console.log("searched");
      console.log(data);

      setLoading(false);
    };

    fetchData();
  }, [reg]);

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setReg(regInput.trim().toUpperCase());
    }
  };

  return (
    <div>
      <div className="info m-8 grid grid-cols-30 gap-5 justify-centered ">
        <div className="innerInfo  col-start-2 col-end-30 row-start-50 row-end-81 bg-[#263039] opacity-75 text-base wrap-break-word text-center mb-12">
          <h2>Aircraft Tracker</h2>
        </div>
        <div className="innerInfo  col-start-2 col-end-30 row-start-80 row-end-85 bg-[#263039] opacity-75 text-opacity-100 text-base wrap-break-word text-center mb-12">
          {loading && <p>Loading</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            value={regInput}
            onChange={(e) => setRegInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter registration (e.g. N12345)"
          />
        </div>
        <div className="innerInfo  col-start-2 col-end-30 row-start-84 row-end-100 bg-[#263039 text-base wrap-break-word text-center mb-12"></div>
        <div className="innerInfo  col-start-2 col-end-30 row-start-100 row-end-110 text-base wrap-break-word text-center mb-12"></div>

        {data[0] && data2 && (
          <div>
            <p>Dest Lat: {data2.response.flightroute.destination.latitude}</p>
            <p>Dest Lon: {data2.response.flightroute.destination.longitude}</p>
            <p>ICAO: {data[0].icao}</p>
            <p>Altitude: {data[0].baroAltitude} ft</p>
            <p>Speed: {data[0].speed} knots</p>
            <p>
              Latitude to Destination:{" "}
              {Math.abs(
                data[0].lat - data2.response.flightroute.destination.latitude
              )}
            </p>
            <p>Latitude: {data[0].lat}</p>
            <p>Longitude: {data[0].lon}</p>
            <p>Heading: {data[0].heading}°</p>
            <p>Vertical Rate: {data[0].verticalRate} ft/min</p>
            <p>Squawk: {data[0].squawk}</p>
            <p>On Ground: {data[0].onGround ? "Yes" : "No"}</p>
            <p>Military: {data[0].isMilitary ? "Yes" : "No"}</p>
            <p>
              Distance:{" "}
              {haversineDistance(
                data[0].lat,
                data[0].lon,
                data2.response.flightroute.destination.latitude,
                data2.response.flightroute.destination.longitude
              ) / 1000}{" "}
              km
            </p>
            <p>
              Position Time: {new Date(data[0].positionTime).toLocaleString()}
            </p>

            {/* Map goes here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tracker;
