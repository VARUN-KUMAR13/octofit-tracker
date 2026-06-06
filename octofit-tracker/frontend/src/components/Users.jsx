import { useEffect, useState } from 'react';

function Users({ apiBase }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBase}/api/users`)
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setError('Unable to load users.'));
  }, [apiBase]);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const endpointText = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users`
    : 'http://localhost:8000/api/users';

  return (
    <div>
      <h2>Users</h2>
      <p className="text-muted">Endpoint: {endpointText}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Team: {user.team}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
