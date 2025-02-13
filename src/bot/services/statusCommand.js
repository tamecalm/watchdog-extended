import TelegramBot from "node-telegram-bot-api"; // Import the TelegramBot class
import { getStatusReport } from "./logStatus.js"; // Import the getStatusReport function
import chalk from "chalk"; // Import chalk for colored console logs
import { botStatus } from "./checkHealth.js"; // Import bot status for user-specific checks

// Create a new Telegram bot instance
const bot = new TelegramBot(WATCHDOG_BOT_TOKEN, { polling: true });

// Handle the /status command for individual users
bot.onText(/\/status/, async (msg) => {
  const chatId = msg.chat.id;
  const userStatusReport = getUserStatusReport(chatId); // Get user-specific status report
  // Send the status report to the chat
  bot.sendMessage(chatId, userStatusReport, { parse_mode: "HTML" }).catch((err) => {
    console.error("❌ Failed to send /status response:", err.message);
  });
});

// Function to get user-specific status report
const getUserStatusReport = (userId) => {
  let report = "📊 <b>Your Bot Status Report</b>\n";
  report += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";

  for (const bot in botStatus) {
    if (isUserMonitoringBot(userId, bot)) { // Check if the user is monitoring this bot
      let status = botStatus[bot] ? "🟢 Online" : "🔴 Offline";
      report += `🤖 <b>${bot}</b>\n`;
      report += `   ├ ⚙️ <b>Status:</b> ${status}\n`;
      report += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }
  }

  console.log(chalk.cyanBright("[STATUS] Command Triggered for user:", userId));
  return report;
};

// Function to check if the user is monitoring a specific bot
const isUserMonitoringBot = (userId, botName) => {
  // Logic to check if the user is monitoring the bot
  // This should query the database or user management service
  return true; // Placeholder for actual implementation
};

// Export the bot object
export default bot;