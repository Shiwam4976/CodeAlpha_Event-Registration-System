const express = require('express');
const { getUserRegistrations, createRegistration, cancelRegistration } = require('../controllers/registrationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getUserRegistrations);
router.post('/', auth, createRegistration);
router.delete('/:id', auth, cancelRegistration);

module.exports = router;

