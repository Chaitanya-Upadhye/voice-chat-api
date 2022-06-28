import models from "../../models";

const { roomsModel } = models;

async function createRoom({ roomInfo }) {
  const room = new roomsModel(roomInfo);
  try {
    const returnVal = await roomsModel.create(room);
    return { ...roominfo, id: returnVal?.id };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getRoomById({ id }) {
  return roomsModel.findById(id).lean();
}
async function getAllRooms(params) {
  return roomsModel.find({}).lean();
}

// async function getEventsByDate({ date }) {
//   const docs = await eventModel.find({ date }).exec();
//   return docs;
// }

// async function updateEvent(eventInfo) {
//   const { id, ...rest } = eventInfo;
//   let updatedEvent = await eventModel.findOneAndUpdate({ _id: id }, rest, {
//     new: true,
//   });
//   return updatedEvent;
// }

export const roomsRepo = {
  createRoom,
  getRoomById,
  getAllRooms,
};
