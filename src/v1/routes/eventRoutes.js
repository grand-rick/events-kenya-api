const express = require("express");
const apiCache = require("apicache");
const Event = require("../../controllers/eventController");
const redis = require("redis");

const router = express.Router();

const cache = apiCache.middleware;

router.get("/", cache("2 minutes"), Event.getAllEvents);
router.get("/:eventId", Event.getOneEvent);
router.get("/:eventId/members", Event.getMembersForEvent);
router.post("/", Event.createEvent);
router.patch("/:eventId", Event.updateEvent);
router.delete("/:eventId", Event.deleteEvent);

module.exports = router;
