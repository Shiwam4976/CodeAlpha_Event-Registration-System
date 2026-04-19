 # Event Registration Backend Implementation TODO

## Approved Plan Steps (to be completed iteratively):

1. ✅ **Created package.json** with dependencies (express, mongoose, etc.) and scripts.

2. ✅ **Installed dependencies** (`npm install`).

3. ✅ **Created .env.example** and .gitignore.

4. ✅ **Created server.js** - Express app setup, MongoDB connection.

5. ✅ **Created models/** directory and files: Event.js, User.js, Registration.js.

6. ✅ **Created controllers/**: eventController.js, authController.js, registrationController.js.

7. ✅ **Created middleware/**: auth.js (JWT).

8. ✅ **Created routes/**: events.js, auth.js, registrations.js.

9. ✅ **Updated server.js** to use routes. 

10. **Test setup**: Run `npm run dev`, verify server starts and connects to DB.

12. **Frontend**: Created React/Vite UI with event list, auth, registration.

## Progress: Backend + Frontend complete!

**Test Backend**: Copy .env.example to .env (set MONGODB_URI, JWT_SECRET), `npm run dev`
**Test Frontend**: cd frontend && npm install && npm start
