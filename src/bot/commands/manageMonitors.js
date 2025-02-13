import {
  getUserMonitors,
  addUserMonitor,
  removeUserMonitor,
  toggleMonitorStatus, // Function to toggle monitoring
  updateUserSubscription, // Function to manage subscription
  updateUserSettings, // Function to manage user settings
} from "../services/monitorManagement.js"; // Import monitor management functions

import { sendMessage } from "../../utils/telegramUtils.js"; // Import sendMessage function

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

// Function to enable/disable a monitor
const handleManageMonitor = async (userId, monitorUrl) => {
  const result = await toggleMonitorStatus(userId, monitorUrl);
  if (result.success) {
    const status = result.enabled ? "✅ Enabled" : "⛔ Disabled";
    sendMessage(userId, `⚙️ Monitor updated: ${monitorUrl} is now ${status}`);
  } else {
    sendMessage(userId, `❌ Failed to update monitor: ${result.message}`);
  }
};

// Function to manage user subscription (e.g., upgrading/downgrading plan)
const handleManageSubscription = async (userId, newPlan) => {
  const result = await updateUserSubscription(userId, newPlan);
  if (result.success) {
    sendMessage(
      userId,
      `🎉 Subscription updated: You are now on the ${newPlan} plan.`
    );
  } else {
    sendMessage(userId, `❌ Failed to update subscription: ${result.message}`);
  }
};

// Function to manage user settings (e.g., notification preferences, thresholds)
const handleManageSettings = async (userId, newSettings) => {
  const result = await updateUserSettings(userId, newSettings);
  if (result.success) {
    sendMessage(userId, `⚙️ Settings updated successfully.`);
  } else {
    sendMessage(userId, `❌ Failed to update settings: ${result.message}`);
  }
};

// Export the command handlers
export {
  handleAddMonitor,
  handleRemoveMonitor,
  handleListMonitors,
  handleManageMonitor,
  handleManageSubscription,
  handleManageSettings,
};
