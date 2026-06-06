import { useEffect, useState } from 'react';

function Activities({ apiBase }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/activities`)
      .then((res) => res.json())
      .then(setActivities)
      .catch(() => setError('Unable to load activities from the API.'));
  }, [apiBase]);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpointText = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';

  return (
    <div>
      <h2>Activities</h2>
      <p className="text-muted">Endpoint: {endpointText}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id} className="list-group-item">
              <strong>{activity.type}</strong> by {activity.user} — {activity.duration} min, {activity.calories} cal
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Activities;
