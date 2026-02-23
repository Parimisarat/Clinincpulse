import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Queue() {

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTokens = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .gte('created_at', today)
        .order('token_number', { ascending: true });

      if (error) throw error;

      // Map Supabase snake_case to component camelCase if needed, 
      // or update the component to use snake_case
      const mappedData = data.map(t => ({
        id: t.id,
        tokenNumber: t.token_number,
        patientName: t.patient_name,
        patientPhone: t.patient_phone,
        status: t.status
      }));

      setTokens(mappedData);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const markCompleted = async (id) => {
    if (!window.confirm("Mark this token as completed?")) return;

    try {
      const { error } = await supabase
        .from('tokens')
        .update({ status: 'COMPLETED' })
        .eq('id', id);

      if (error) throw error;
      loadTokens();
    } catch (error) {
      console.error("Error updating token:", error);
    }
  };

  return (
    <div className="container">
      <h1>Today's Queue</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tokens.length === 0 ? (
        <p>No tokens generated today.</p>
      ) : (
        <table className="queue-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tokens.map(token => (
              <tr key={token.id}>
                <td>{token.tokenNumber}</td>
                <td>{token.patientName}</td>
                <td>{token.patientPhone}</td>
                <td>
                  <span className={
                    token.status === "ACTIVE"
                      ? "status-active"
                      : "status-completed"
                  }>
                    {token.status}
                  </span>
                </td>
                <td>
                  {token.status === "ACTIVE" && (
                    <button
                      className="complete-btn"
                      onClick={() => markCompleted(token.id)}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}