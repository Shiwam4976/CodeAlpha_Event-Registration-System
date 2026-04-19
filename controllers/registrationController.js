const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Get user registrations
const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event', 'name description date location')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register for event
const createRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.currentRegistrations >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if already registered
    const existing = await Registration.findOne({ user: req.user.id, event: eventId });
    if (existing) return res.status(400).json({ message: 'Already registered' });

    const registration = new Registration({
      user: req.user.id,
      event: eventId
    });
    await registration.save();

    event.currentRegistrations += 1;
    await event.save();

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel registration
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    registration.status = 'cancelled';
    await registration.save();

    const event = await Event.findById(registration.event);
    event.currentRegistrations -= 1;
    await event.save();

    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserRegistrations,
  createRegistration,
  cancelRegistration
};

