import mongoose from "mongoose";
import { v1 } from "uuid";
const { Schema } = mongoose;

const UsersSchema = new Schema({
  _id: { type: String, default: () => v1() },
  name: String,
  userName: String,
  email: String,
});

const clubSchema = new Schema({
  _id: { type: String, default: () => v1() },
  name: String,
  tags: Array,
  founderId: String,
});

//TODO: Add Validations
const roomSchema = new Schema({
  _id: { type: String, default: () => v1() },
  name: String,
  date: Date,
  clubId: String,
});

const followersSchema = new Schema({
  _id: { type: String, default: () => v1() },
  clubId: String,
  userId: Date,
});

const participantSchema = {
  _id: { type: String, default: () => v1() },
  userId: String,
  roomId: String,
  peerId: String,
  role: String,
  joinDate: Date,
};

export default {
  clubsModel: mongoose.model(
    "clubs",
    mongoose.Schema(clubSchema, { timestamps: true })
  ),
  participantsModel: mongoose.model(
    "participants",
    mongoose.Schema(participantSchema, { timestamps: true })
  ),
  roomsModel: mongoose.model(
    "rooms",
    mongoose.Schema(roomSchema, { timestamps: true })
  ),

  followersModel: mongoose.model(
    "followers",
    mongoose.Schema(followersSchema, { timestamps: true })
  ),
};
