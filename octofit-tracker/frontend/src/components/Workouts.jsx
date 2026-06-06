import { useEffect, useState } from 'react';

function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/workouts`)
      .then((res) => res.json())
      .then(setWorkouts)
      .catch(() => setError('Unable to load workouts.'));
  }, [apiBase]);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpointText = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';

  return (
    <div>
      <h2>Workouts</h2>
      <p className="text-muted">Endpoint: {endpointText}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">Focus: {workout.focus}</p>
                  <p className="card-text">Duration: {workout.duration} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
