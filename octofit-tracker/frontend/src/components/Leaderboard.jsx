import { useEffect, useState } from 'react';

function Leaderboard({ apiBase }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/leaderboard`)
      .then((res) => res.json())
      .then(setLeaderboard)
      .catch(() => setError('Unable to load leaderboard data.'));
  }, [apiBase]);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpointText = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard';

  return (
    <div>
      <h2>Leaderboard</h2>
      <p className="text-muted">Endpoint: {endpointText}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {leaderboard.length === 0 ? (
        <p>No leaderboard entries yet.</p>
      ) : (
        <ol className="list-group list-group-numbered">
          {leaderboard.map((item) => (
            <li key={item.user} className="list-group-item">
              {item.user}: {item.calories} calories
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
