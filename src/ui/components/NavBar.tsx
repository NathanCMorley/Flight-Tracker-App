import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
      <div className="logo">
        <Link className="nav-link" to="/" onClick={() => {}}>
          Flight Tracker
        </Link>
      </div>
      <div className="nav-links">
        <div className="nav-item">
          <Link className="nav-link" to="/" onClick={() => {}}>
            Home
          </Link>
        </div>
        <div className="nav-item" onClick={() => {}}>
          <Link className="nav-link" to="/tracker">
            Track
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
