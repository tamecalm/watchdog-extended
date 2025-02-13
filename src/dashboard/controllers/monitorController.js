import Monitor from "../models/monitorModel.js"; // Import the Monitor model
import User from "../models/userModel.js"; // Import the User model
import chalk from "chalk"; // Import chalk for colored console logs

// Function to add a new monitor for a user
export const addMonitor = async (req, res) => {
  const { userId, monitorData } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMonitor = new Monitor({ ...monitorData, userId });
    await newMonitor.save();

    console.log(chalk.green(`[MONITOR ADDED] ${monitorData.name} for user ${userId}`));
    res.status(201).json({ message: "Monitor added successfully", monitor: newMonitor });
  } catch (error) {
    console.error(chalk.red(`[ERROR ADDING MONITOR] ${error.message}`));
    res.status(500).json({ message: "Error adding monitor", error: error.message });
  }
};

// Function to remove a monitor for a user
export const removeMonitor = async (req, res) => {
  const { userId, monitorId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const monitor = await Monitor.findOneAndDelete({ _id: monitorId, userId });
    if (!monitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    console.log(chalk.green(`[MONITOR REMOVED] ${monitor.name} for user ${userId}`));
    res.status(200).json({ message: "Monitor removed successfully" });
  } catch (error) {
    console.error(chalk.red(`[ERROR REMOVING MONITOR] ${error.message}`));
    res.status(500).json({ message: "Error removing monitor", error: error.message });
  }
};

// Function to list all monitors for a user
export const listMonitors = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const monitors = await Monitor.find({ userId });
    res.status(200).json({ monitors });
  } catch (error) {
    console.error(chalk.red(`[ERROR LISTING MONITORS] ${error.message}`));
    res.status(500).json({ message: "Error listing monitors", error: error.message });
  }
};