import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    try {
      await axios.post('/api/registrations', { eventId: id });
      alert('Registered successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Capacity:</strong> {event.currentRegistrations}/{event.capacity}</p>
      <p><strong>Organizer:</strong> {event.organizer?.name}</p>
      <button className="btn btn-success me-2" onClick={handleRegister}>Register</button>
      <button className="btn btn-secondary" onClick={() => navigate('/events')}>Back</button>
    </div>
  );
};

export default EventDetails;

