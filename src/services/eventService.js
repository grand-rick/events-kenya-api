const { v4: uuid } = require("uuid");
const Event = require("../database/Event");

const getAllEvents = () => {
  try {
    const allEvents = Event.getAllEvents();
    return allEvents;
  } catch (error) {
    throw error;
  }
};

const getOneEvent = (eventId) => {
  try {
    const event = Event.getOneEvent(eventId);

    return event;
  } catch (error) {
    throw error;
  }
};

const createEvent = (eventDetails) => {
  try {
    const newEvent = Event.createEvent({
      id: uuid(),
      ...eventDetails,
    });

    return newEvent;
  } catch (error) {
    throw error;
  }
};

const updateEvent = (eventId, eventForUpdate) => {
  try {
    const updatedEvent = Event.updateEvent(eventId, eventForUpdate);

    return updatedEvent;
  } catch (error) {
    throw error;
  }
};

const deleteEvent = (eventId) => {
  try {
    const deletedEvent = Event.deleteEvent(eventId);
    return deletedEvent;
  } catch (error) {
    throw error;
  }
};

const getMembersForEvent = (eventId) => {
  try {
    return Event.getMembersForEvent(eventId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getMembersForEvent,
};
