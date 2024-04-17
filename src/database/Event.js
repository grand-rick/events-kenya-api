const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllEvents = () => {
  try {
    return DB.events;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getOneEvent = (eventId) => {
  try {
    const event = DB.events.find((event) => event.id === eventId);

    if (!event) {
      throw {
        status: 404,
        message: `Could not find event with the id ${eventId}`,
      };
    }

    return event;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createEvent = (eventDetails) => {
  try {
    const isAlreadyAdded =
      DB.events.findIndex((event) => event.id === eventDetails.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Event is already added`,
      };
    }

    DB.events.push(eventDetails);
    saveToDatabase(DB);
    return eventDetails;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateEvent = (eventId, changes) => {
  try {
    const indexForEventToUpdate = DB.events.findIndex(
      (event) => event.id === eventId
    );

    if (indexForEventToUpdate === -1) {
      throw {
        status: 400,
        message: `Could not find event with the id ${eventId}`,
      };
    }

    const updatedEvent = {
      ...DB.events[indexForEventToUpdate],
      ...changes,
    };

    DB.events[indexForEventToUpdate] = updatedEvent;

    saveToDatabase(DB);
    return updatedEvent;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteEvent = (eventId) => {
  try {
    const indexForDeletion = DB.events.findIndex(
      (event) => event.id === eventId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find event with the id '${eventId}'`,
      };
    }
    DB.events.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getMembersForEvent = (eventId) => {
  try {
    const members = DB.members.find((member) => member.eventId === eventId);
    return members;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
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
