import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscriptionPlan: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  monitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;