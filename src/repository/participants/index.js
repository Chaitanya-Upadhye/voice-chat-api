import models from "../../models";

const { participantsModel } = models;

async function addParticipants({ participantsInfo }) {
  const participant = new participantsModel(participantsInfo);
  try {
    let returnVal;
    const doesPArticipantExist = await participantsModel
      .find()
      .where("userId")
      .equals(participant.userId)
      .exec();
    if (!doesPArticipantExist.length) {
      returnVal = await participantsModel.create(participant);
      return { ...participantsInfo, id: returnVal?.id };
    }
    const updatedParticipant = await participantsModel
      .findOneAndUpdate({ _id: doesPArticipantExist[0]._id }, participantsInfo)
      .lean();

    return { ...updatedParticipant };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getParticipantsByRoom({ id }) {
  return participantsModel.find().where("roomId").equals(id).exec();
}
async function deleteParticipant({ id }) {
  return participantsModel.findOneAndDelete({ _id: id }).lean();
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

export const participantsRepo = {
  addParticipants,
  getParticipantsByRoom,
  deleteParticipant,
};
