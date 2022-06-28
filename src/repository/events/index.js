import models from "../../models";
import { getFormattedDate } from "../../helpers/dates-helper";

const { eventModel } = models;

async function createEvent({ eventInfo }) {
  const event = new eventModel(eventInfo);
  try {
    const returnVal = await eventModel.create(event);
    return { ...eventInfo, id: returnVal?.id };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getEventById({ id }) {
  return eventModel.findById(id).lean();
}

async function getEventsByDate({ date }) {
  const docs = await eventModel.find({ date }).exec();
  return docs;
}

async function updateEvent(eventInfo) {
  const { id, ...rest } = eventInfo;
  let updatedEvent = await eventModel.findOneAndUpdate({ _id: id }, rest, {
    new: true,
  });
  return updatedEvent;
}
async function getEventsForSlots({ slotStart, slotEnd }) {
  try {
    const events = await eventModel
      .find({
        date: {
          $gte: getFormattedDate(slotStart),
          $lte: getFormattedDate(slotEnd),
        },
      })
      .lean();
    return events;
  } catch (error) {
    console.log(error);
  }
}

export const eventsRepo = {
  createEvent,
  getEventById,
  updateEvent,
  getEventsByDate,
  getEventsForSlots,
};
