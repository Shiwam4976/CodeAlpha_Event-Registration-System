import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/registrations')
      .then(res => setRegistrations(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (confirm('Cancel registration?')) {
      try {
        await axios.delete(`/api/registrations/${id}`);
        setRegistrations(registrations.filter(r => r._id !== id));
      } catch (err) {
        alert('Cancel failed');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Registrations</h2>
      {registrations.length === 0 ? (
        <p>No registrations</p>
      ) : (
        <div className="row">
          {registrations.map(reg => (
            <div key={reg._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5>{reg.event.name}</h5>
                  <p>{new Date(reg.event.date).toLocaleDateString()}</p>
                  <p>Status: <span className="badge bg-info">{reg.status}</span></p>
                  {reg.status === 'pending' && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleCancel(reg._id)}>Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;

