const Event = require("../services/eventService");

const getAllEvents = (req, res) => {
  try {
    const allEvents = Event.getAllEvents();
    res.send({
      status: "OK",
      data: allEvents,
    });
  } catch (error) {
    res.send({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const getOneEvent = (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      res.status(400).send({
        status: "FAILED",
        message: "Missing required param: eventId",
      });
    }

    const event = Event.getOneEvent(eventId);

    res.send({
      status: "OK",
      data: event,
    });
  } catch (error) {
    res.send({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const createEvent = (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    if (!name || !date || !location || !description) {
      res.status(400).send({
        status: "FAILED",
        message:
          "Missing required property among: name, date, location, description",
      });
    }

    const newEvent = {
      name,
      date,
      location,
      description,
    };

    const event = Event.createEvent(newEvent);

    res.send({
      status: "OK",
      data: event,
    });
  } catch (error) {
    res.send({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const updateEvent = (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const { eventId } = req.params;

    if (!name || !date || !location || !description || !eventId) {
      res.status(400).send({
        status: "FAILED",
        message:
          "Missing required property among: name, date, location, description, eventId",
      });
    }

    const eventForUpdate = {
      name,
      date,
      location,
      description,
    };

    const event = Event.updateEvent(eventId, eventForUpdate);

    res.send({
      status: "OK",
      data: event,
    });
  } catch (error) {
    res.send({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const deleteEvent = (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      res.status(400).send({
        status: "FAILED",
        message: "Missing required param: eventId",
      });
    }

    const event = Event.deleteEvent(eventId);

    res.send({
      status: "OK",
      data: event,
    });
  } catch (error) {
    res.send({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const getMembersForEvent = (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      res.status(400).send({
        status: "FAILED",
        message: "Please provide the eventId",
      });
    }

    const membersForSpecificEvent = Event.getMembersForEvent(eventId);

    res.status(200).send({
      status: "OK",
      data: membersForSpecificEvent,
    });
  } catch (error) {}
};

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getMembersForEvent,
};
