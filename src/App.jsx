import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";
import GenerateToken from "./pages/GenerateToken";
import Queue from "./pages/Queue";
import "./index.css";

export default function App() {

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <nav className="navbar">
        <div className="logo">
          <FaHospital size={20} />
          ClinicPulse
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
              Dashboard
            </NavLink>

            <NavLink to="/add-doctor" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Doctor
            </NavLink>

            <NavLink to="/generate-token" className={({ isActive }) => isActive ? "active-link" : ""}>
              Generate Token
            </NavLink>

            <NavLink to="/queue" className={({ isActive }) => isActive ? "active-link" : ""}>
              Queue
            </NavLink>
          </div>

          <div className="live-clock">
            <span className="live-dot"></span>
            {time}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/generate-token" element={<GenerateToken />} />
        <Route path="/queue" element={<Queue />} />
      </Routes>
    </Router>
  );
}