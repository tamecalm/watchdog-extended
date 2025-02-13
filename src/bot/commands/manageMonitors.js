import {
  getUserMonitors,
  addUserMonitor,
  removeUserMonitor,
} from "../services/monitorManagement.js"; // Import the monitor management functions
import { sendMessage } from "../../utils/telegramUtils.js"; // Import the sendMessage function

// Function to handle adding a monitor
const handleAddMonitor = async (userId, monitorUrl) => {
  const result = await addUserMonitor(userId, monitorUrl);
  if (result.success) {
    sendMessage(userId, `✅ Monitor added: ${monitorUrl}`);
  } else {
    sendMessage(userId, `❌ Failed to add monitor: ${result.message}`);
  }
};

// Function to handle removing a monitor
const handleRemoveMonitor = async (userId, monitorUrl) => {
  const result = await removeUserMonitor(userId, monitorUrl);
  if (result.success) {
    sendMessage(userId, `✅ Monitor removed: ${monitorUrl}`);
  } else {
    sendMessage(userId, `❌ Failed to remove monitor: ${result.message}`);
  }
};

// Function to handle listing monitors
const handleListMonitors = async (userId) => {
  const monitors = await getUserMonitors(userId);
  if (monitors.length > 0) {
    const monitorList = monitors.map((monitor) => `- ${monitor}`).join("\n");
    sendMessage(userId, `📋 Your Monitors:\n${monitorList}`);
  } else {
    sendMessage(userId, `🔍 You have no monitors set up.`);
  }
};

// Export the command handlers
export { handleAddMonitor, handleRemoveMonitor, handleListMonitors };
