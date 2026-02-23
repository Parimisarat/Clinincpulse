import { useEffect, useState } from "react";

export default function Queue() {

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTokens = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/tokens/today");
      const data = await response.json();
      setTokens(data);
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
      await fetch(`http://localhost:8082/api/tokens/${id}/complete`, {
        method: "PUT"
      });
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