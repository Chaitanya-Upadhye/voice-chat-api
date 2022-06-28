const express = require("express");
const router = express.Router();
import { responseHandler } from "../../helpers/req-resp-helper";
import { roomsUseCases } from "../../use-cases/rooms";
import makeCallback from "../../express-callback";
import { participantsRepo } from "../../repository/participants";

async function getAllRooms(httpRequest) {
  try {
    const { source = {}, ...roomInfo } = httpRequest.body;

    const rooms = await roomsUseCases.getAllRooms();

    //TODO: create helper functions for stanmdard response
    return responseHandler(200, { rooms });
  } catch (error) {
    //log errors
    return responseHandler(400, { error: error?.message });
  }
}

async function getRoomById(httpRequest) {
  try {
    const { source = {}, params } = httpRequest;
    const response = await Promise.all([
      roomsUseCases.getRoom({ id: params?.id }),
      participantsRepo.getParticipantsByRoom({ id: params.id }),
    ]);

    return responseHandler(200, {
      room: { ...response[0], participants: response[1] },
    });
  } catch (error) {}
}

router.get("/:id", makeCallback(getRoomById));
router.get("/", makeCallback(getAllRooms));
router.post("/create", (req, res) => {
  res.send("room created");
});

module.exports = router;
