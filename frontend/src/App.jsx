import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import MyRegistrations from './components/MyRegistrations';
import AdminPanel from './components/AdminPanel';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user info
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <Link className="navbar-brand" to="/">Events</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/events">Events</Link>
            {token ? (
              <>
                <Link className="nav-link" to="/my-registrations">My Registrations</Link>
                {user?.role === 'admin' && <Link className="nav-link" to="/admin">Admin</Link>}
                <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} setUser={setUser} />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register setToken={setToken} setUser={setUser} />} />
          <Route path="/my-registrations" element={token ? <MyRegistrations /> : <Navigate to="/login" />} />
          <Route path="/admin" element={token && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

