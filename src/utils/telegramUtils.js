import chalk from "chalk";
import { bot } from "../bot/services/userManagement.js"; // Import the bot instance

/**
 * Send a message to a specific chat.
 * @param {number} chatId - The chat ID to send the message to.
 * @param {string} message - The message text.
 * @param {object} [options={}] - Additional options for Telegram message formatting.
 */
export const sendMessage = async (chatId, message, options = {}) => {
  try {
    await bot.sendMessage(chatId, message, {
      parse_mode: "Markdown",
      ...options,
    });
    console.log(chalk.green(`[MESSAGE SENT] -> Chat ID: ${chatId}`));
  } catch (error) {
    console.error(chalk.red(`❌ [MESSAGE ERROR] -> ${error.message}`));
  }
};

/**
 * Send a notification with a predefined prefix.
 * @param {number} chatId - The chat ID to send the notification to.
 * @param {string} notification - The notification message.
 */
export const sendNotification = (chatId, notification) => {
  const formattedNotification = `🔔 *Notification:*\n${notification}`;
  sendMessage(chatId, formattedNotification);
};

/**
 * Logs command usage to the console.
 * @param {string} command - The command being executed.
 * @param {number} chatId - The chat ID where the command was used.
 */
export const logCommandUsage = (command, chatId) => {
  console.log(chalk.blue(`[COMMAND] -> ${command} used by Chat ID: ${chatId}`));
};
