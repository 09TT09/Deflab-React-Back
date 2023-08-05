const EventModel = require("../models/event.model");
const OrganizationModel = require("../models/organization.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// CREATE EVENT
module.exports.createEvent = async (req, res) => {
    const { name, description, location, mapCoordinates, date, time, tags, organizationId } = req.body;
    
    try {
      const event = await EventModel.create({ name, description, location, mapCoordinates, date, time, tags, organizationId });

      const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
        organizationId,
        { $addToSet: { eventsId: event._id } },
        { new: true, upsert: false }
      );

      return res.status(201).json({ event: event._id, updatedOrganization });
    } catch (error) {
      return res.status(200).send(error);
    }
};

// GET ALL EVENTS
module.exports.getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        return res.send(events);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// GET 3 EVENTS
module.exports.getThreeEvents = async (req, res) => {
    try {
        const events = await EventModel.find().limit(3);
        return res.send(events);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// GET EVENT BY ID
module.exports.getEventById = async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id);
        return res.send(event);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// UPDATE EVENT PARTICIPANTS
module.exports.UpdateEventParticipants = async (req, res) => {

    if (!ObjectId.isValid(req.body.id) || !ObjectId.isValid(req.body.userId)) {
        return res.status(400).send("Id inconnu : " + req.params.id);
    }

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { participantsId: req.body.userId } },
            { new: true, upsert: false }
        );

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { eventId: req.params.id } },
            { new: true, upsert: false }
        );

        return res.status(201).json({ updatedEvent, updatedUser });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
