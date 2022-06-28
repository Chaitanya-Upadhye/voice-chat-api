import { eventsUseCases } from "../../use-cases/events";
import * as dateHelpers from "../../helpers/dates-helper";
import { responseHandler } from "../../helpers/req-resp-helper";

//TODO: Build Skeleton function that handles response and incoming req with try-catch and pass actual logic as callback

async function postEvent(httpRequest) {
  try {
    const { source = {}, ...eventInfo } = httpRequest.body;

    const newEvent = await eventsUseCases.addEvent({ eventInfo });

    //TODO: create helper functions for stanmdard response
    return responseHandler(201, { newEvent });
  } catch (error) {
    //log errors
    return responseHandler(400, { error: error?.message });
  }
}

async function getEvent(httpRequest) {
  try {
    const { source = {}, params } = httpRequest;
    const event = await eventsUseCases.getEvent({ id: params?.id });

    return responseHandler(200, { event });
  } catch (error) {}
}

async function getEventsInSlot(httpRequest) {
  try {
    const { source = {}, params, query } = httpRequest;

    //TODO: Add pagination
    const { slotStart, slotEnd } = query;

    if (!dateHelpers.validateSlots({ slotStart, slotEnd }))
      return responseHandler(400, "Invalid slot-start and slot-end dates");

    const events = await eventsUseCases.getEventsForSlots({
      slotStart,
      slotEnd,
    });
    return responseHandler(200, { events });
  } catch (error) {
    return responseHandler(400, { error: error?.message });
  }
}

async function updateEvent(httpRequest) {
  try {
    const { params, body = {} } = httpRequest;
    const updatedEvent = await eventsUseCases.updateEvent(
      params?.eventId,
      body
    );
    return responseHandler(200, { updatedEvent });
  } catch (error) {
    return responseHandler(400, { error: error?.message });
  }
}

export const eventsControllerMethods = {
  getEvent,
  postEvent,
  getEventsInSlot,
  updateEvent,
};
