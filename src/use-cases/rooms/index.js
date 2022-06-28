import { roomsRepo } from "../../repository/rooms";

async function createRoom({ roomInfo }) {
  return roomsRepo.createRoom({ roomInfo });
}

async function getRoom({ id }) {
  return roomsRepo.getRoomById({ id });
}
async function getAllRooms() {
  return roomsRepo.getAllRooms();
}

export const roomsUseCases = {
  createRoom,
  getRoom,
  getAllRooms,
};
