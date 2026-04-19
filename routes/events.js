const express = require('express');
const { getAllEvents, getEventById, createEvent } = require('../controllers/eventController');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', auth, admin, createEvent);

module.exports = router;

