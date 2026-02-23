import { useEffect, useState } from "react";
import { FaUserMd, FaClock, FaCheckCircle, FaTicketAlt } from "react-icons/fa";

export default function Dashboard() {

  const [stats, setStats] = useState({
    doctors: 0,
    active: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    fetch("http://localhost:8082/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="container">

      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="cards">

        <Card 
          title="Doctors"
          value={stats.doctors}
          icon={<FaUserMd />}
          color="blue"
        />

        <Card 
          title="Active Tokens"
          value={stats.active}
          icon={<FaClock />}
          color="yellow"
        />

        <Card 
          title="Completed Today"
          value={stats.completed}
          icon={<FaCheckCircle />}
          color="green"
        />

        <Card 
          title="Total Today"
          value={stats.total}
          icon={<FaTicketAlt />}
          color="purple"
        />

      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className={`premium-card ${color}`}>

      <div className="card-top">
        <div className="card-icon">
          {icon}
        </div>
      </div>

      <div className="card-content">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

    </div>
  );
}