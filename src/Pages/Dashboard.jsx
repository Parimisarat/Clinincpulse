import { useEffect, useState } from "react";
import { FaUserMd, FaClock, FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {

  const [stats, setStats] = useState({
    doctors: 0,
    active: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split('T')[0];

      // 1. Total Doctors
      const { count: doctorCount } = await supabase
        .from('doctors')
        .select('*', { count: 'exact', head: true });

      // 2. Active Tokens Today
      const { count: activeCount } = await supabase
        .from('tokens')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ACTIVE')
        .gte('created_at', today);

      // 3. Completed Tokens Today
      const { count: completedCount } = await supabase
        .from('tokens')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'COMPLETED')
        .gte('created_at', today);

      // 4. Total Tokens Today
      const { count: totalCount } = await supabase
        .from('tokens')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      setStats({
        doctors: doctorCount || 0,
        active: activeCount || 0,
        completed: completedCount || 0,
        total: totalCount || 0
      });
    };

    fetchStats();
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