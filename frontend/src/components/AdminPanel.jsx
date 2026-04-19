import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [formData, setFormData] = useState({ name: '', description: '', date: '', location: '', capacity: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events', formData);
      alert('Event created!');
      setFormData({ name: '', description: '', date: '', location: '', capacity: '' });
    } catch (err) {
      alert('Create failed');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div className="mb-3">
          <input type="datetime-local" className="form-control" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Capacity" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} />
        </div>
        <button type="submit" className="btn btn-success">Create Event</button>
      </form>
    </div>
  );
};

export default AdminPanel;

