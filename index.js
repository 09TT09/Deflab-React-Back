require("./database/database.js");
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 8080

const UserModel = require('./models/user.model');
const EventModel = require('./models/event.model');
const OrganizationModel = require('./models/organization.model');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Database Home!')
})

// Users

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Events

app.get('/events', async (req, res) => {
  try {
    const events = await EventModel.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/events/limited3', async (req, res) => {
  try {
    const events = await EventModel.find().limit(3);
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Organizations

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await OrganizationModel.find();
    res.send(organizations);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/organizations/limeted5', async (req, res) => {
  try {
    const organizations = await OrganizationModel.find().limit(5);
    res.send(organizations);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const organization = await OrganizationModel.findById(req.params.id);
    res.send(organization);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
