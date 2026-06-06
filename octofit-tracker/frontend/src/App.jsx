import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Update <strong>.env.local</strong> with <code>VITE_CODESPACE_NAME</code> to enable Codespaces API URLs.
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/activities" element={<Activities apiBase={apiBase} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        <Route path="/teams" element={<Teams apiBase={apiBase} />} />
        <Route path="/users" element={<Users apiBase={apiBase} />} />
        <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
        <Route path="*" element={<Activities apiBase={apiBase} />} />
      </Routes>
    </div>
  );
}

export default App;
