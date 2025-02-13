import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  botName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["UP", "DOWN"],
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;