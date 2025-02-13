import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  healthUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

monitorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Monitor = mongoose.model("Monitor", monitorSchema);

export default Monitor;