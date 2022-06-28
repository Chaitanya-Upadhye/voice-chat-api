import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const { createServer } = require("http");
const { Server } = require("socket.io");
var cors = require("cors");

import { process } from "babel-jest";
import rooms from "./controllers/rooms";
import { participantsRepo } from "./repository/participants";
const Database = require("../db/db.js");

dotenv.config();
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");
const apiRoot = process.env.API_ROOT;
const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

Database.connect({
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  dbname: process.env.EVENTS_DB_NAME,
});

//TODO : for each controller create init() method and map routes to controller methods inside. then, loop and call all init methods here

// app.post(`/event/create`, makeCallback(eventsControllerMethods.postEvent));
// app.get(`/event/:id`, makeCallback(eventsControllerMethods.getEvent));
// app.get(`/events`, makeCallback(eventsControllerMethods.getEventsInSlot));
// app.put(`/event/:eventId`, makeCallback(eventsControllerMethods.updateEvent));

//TODO: add NOT FOUND
app.use(cors());

app.use("/rooms", rooms);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// listen for requests
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // ...
  socket.on("user-joined-room", async (eventInfo, callback) => {
    socket.join(eventInfo.roomId);
    const newOrupdatedParticipant = await participantsRepo.addParticipants({
      participantsInfo: {
        userId: eventInfo.user.sub,
        roomId: eventInfo.roomId,
        peerId: eventInfo.peerId,
        role: "A",
        joinDate: new Date(),
      },
    });
    const participants = await participantsRepo.getParticipantsByRoom({
      id: eventInfo.roomId,
    });
    socket
      .to(eventInfo.roomId)
      .emit("user-joined-room", newOrupdatedParticipant);
    callback(participants);
  });
  socket.on("user-left-room", async (eventInfo) => {
    socket.leave(eventInfo.roomId);
    let leftParticipant = await participantsRepo.deleteParticipant({
      id: eventInfo.user?._id,
    });
    // let roomParticipant;
    // if (eventInfo.role !== 'HOST') {
    //     roomParticipant = await db.removeParticipant(eventInfo.room_id, eventInfo.user_id);
    // } else {
    //     roomParticipant = await db.updateParticipant(eventInfo.room_id, eventInfo.user_id, null);
    // }
    console.log(leftParticipant, "LEFT ROOm");
    socket.to(eventInfo.roomId).emit("user-left-room", leftParticipant);
  });
});

httpServer.listen(8080);

export default app;
