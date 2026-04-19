import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div className="row">
        {events.map(event => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p><small>{new Date(event.date).toLocaleDateString()}</small></p>
                <p>{event.location}</p>
                <Link to={`/events/${event._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;

