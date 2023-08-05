const router = require("express").Router();
const eventController = require("../controllers/events.controller");

router.post("/create", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/limited3", eventController.getThreeEvents);
router.get("/:id", eventController.getEventById);
router.patch("/participants/:id", eventController.UpdateEventParticipants);

module.exports = router;