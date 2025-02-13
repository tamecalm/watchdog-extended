import TelegramBot from "node-telegram-bot-api"; // Import the TelegramBot class
import { WATCHDOG_BOT_TOKEN, CHAT_ID, USER_ID } from "../../config.js"; // Import the Telegram bot token and chat ID
import chalk from "chalk"; // Import chalk for colored console logs

// Create a new Telegram bot instance
const bot = new TelegramBot(WATCHDOG_BOT_TOKEN, { polling: false });

// Custom error logger for neat console output
function logError(error) {
  if (error.code === "EFATAL" || error.message.includes("getaddrinfo")) {
    console.error(chalk.red.bold("❌ Network Error:"));
    console.error(chalk.yellow("🚨 Failed to connect to Telegram API."));
    console.error(chalk.gray(`🔍 Error Details: ${error.message}`));
  } else {
    console.error(chalk.red.bold("❗ Unexpected Error:"));
    console.error(chalk.yellow(error.message));
    console.error(chalk.gray(error.stack));
  }
}

// Attach the error handler to the bot
bot.on("polling_error", logError);

// Function to send alerts to the admins
const notifyAdmins = async (message) => {
  try {
    await bot.sendMessage(CHAT_ID, message, { parse_mode: "HTML" });
    await bot.sendMessage(USER_ID, message, { parse_mode: "HTML" });
    console.log(chalk.yellow(`[ALERT SENT] ${message}`));
  } catch (error) {
    console.error(
      chalk.bgRed("❌ Failed to send Telegram alert:", error.message)
    );
  }
};

// Export the notifyAdmins function and the bot object
export default notifyAdmins;
export { bot };