import { getUserSettings, updateUserSettings } from '../services/userManagement.js'; // Import user management functions
import { sendMessage } from '../utils/messageUtils.js'; // Import utility for sending messages

// Function to handle the /settings command
const settingsCommand = async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Retrieve user settings
  const userSettings = await getUserSettings(userId);
  
  // Construct settings message
  let settingsMessage = "⚙️ *Your Settings*\n";
  settingsMessage += `🔔 Notifications: ${userSettings.notifications ? "Enabled" : "Disabled"}\n`;
  settingsMessage += `💳 Subscription Plan: ${userSettings.subscriptionPlan}\n`;
  settingsMessage += "Use /update_settings to change your settings.";

  // Send settings message to user
  sendMessage(chatId, settingsMessage);
};

// Function to handle updating user settings
const updateSettingsCommand = async (msg, newSettings) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Update user settings
  await updateUserSettings(userId, newSettings);

  // Send confirmation message
  sendMessage(chatId, "✅ Your settings have been updated successfully.");
};

// Export the command functions
export { settingsCommand, updateSettingsCommand };