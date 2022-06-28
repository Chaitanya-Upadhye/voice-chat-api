import { eventsRepo } from "../../repository/events";

async function addEvent({ eventInfo }) {
  // TODO: try to use models and validations in use-cases
  // add validations to chedk if the event is in the past, check if there are more than 2 events on the same day
  const docsDate = await eventsRepo.getEventsByDate({ date: eventInfo?.date });
  if (docsDate.length >= 2)
    throw new Error(`Cannot have any more events on ${eventInfo?.date}`);
  return eventsRepo.createEvent({ eventInfo });
}

async function getEvent({ id }) {
  return eventsRepo.getEventById({ id });
}

async function getEventsForSlots(slots) {
  return eventsRepo.getEventsForSlots(slots);
}

async function updateEvent(id, eventInfo) {
  const currentEvent = await eventsRepo.getEventById({ id });
  if (!currentEvent) throw new Error("Event does not exist");

  return eventsRepo.updateEvent({ id, ...eventInfo });
}

export const eventsUseCases = {
  addEvent,
  getEvent,
  getEventsForSlots,
  updateEvent,
};
