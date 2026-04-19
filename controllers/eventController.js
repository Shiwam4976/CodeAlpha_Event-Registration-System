const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name').sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name').populate('registrations', 'status');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event (admin only)
const createEvent = async (req, res) => {
  const event = new Event({
    ...req.body,
    organizer: req.user.id
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent
};

