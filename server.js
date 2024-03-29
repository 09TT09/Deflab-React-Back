// LIBRARIES
require('dotenv').config({ path: '.env' });
require("./config/database.js");
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// CORS
const corsOptions = {
  origin: "https://deflab-82309.web.app",
  credentials: true,
  'allowedHeaders' : ['sessionId', 'Content-Type'],
  'exposedHeaders' : ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// COMPONENTS
const usersRoutes = require('./routes/users.route');
const eventsRoutes = require('./routes/events.route');
const organizationsRoutes = require('./routes/organizations.route');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

//app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (request, response) => {
  response.status(200).send(response.locals.user._id)
});

// ROUTES
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);
app.use('/organizations', organizationsRoutes);

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
