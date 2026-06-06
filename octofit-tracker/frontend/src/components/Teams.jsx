import { useEffect, useState } from 'react';

function Teams({ apiBase }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/teams`)
      .then((res) => res.json())
      .then(setTeams)
      .catch(() => setError('Unable to load teams.'));
  }, [apiBase]);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpointText = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams';

  return (
    <div>
      <h2>Teams</h2>
      <p className="text-muted">Endpoint: {endpointText}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">Members: {team.members}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
