import transition from "../transition";
import FlightCard from "../components/FlightCard";

const Tracker = () => {
  return (
    <div>
      <h1>Flight Tracker</h1>

      <FlightCard />
    </div>
  );
};

export default transition(Tracker);
