import chalk from "chalk"; // Import chalk for colored console logs
import { botStatus, botUptime, botPing, lastChecked, getUptime } from "./checkHealth.js"; // Import all required data
import { User } from "../../dashboard/models/userModel.js"; // Import User model for logging user-specific status

// Function to log the status of a bot
const logStatus = async (botName, isUp, userId) => {
  const time = new Date().toLocaleTimeString();
  if (isUp) {
    console.log(chalk.green(`[${time}] ✅ ${botName} is running`));
    await logUserStatus(userId, botName, true); // Log user-specific status
  } else {
    console.log(chalk.red(`[${time}] ❌ ${botName} is DOWN!`));
    await logUserStatus(userId, botName, false); // Log user-specific status
  }
};

// Function to log user-specific bot status in MongoDB
const logUserStatus = async (userId, botName, isUp) => {
  try {
    await User.updateOne(
      { userId: userId },
      { $push: { statusLogs: { botName, isUp, timestamp: new Date() } } },
      { upsert: true }
    );
  } catch (error) {
    console.error(chalk.red("❌ Failed to log user status:", error.message));
  }
};

// Function to return bot statuses for /status command
const getStatusReport = async (userId) => {
  let report = "📊 <b>Bot Status Report</b>\n";
  report += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";

  for (const bot in botStatus) {
    let status = botStatus[bot] ? "🟢 Online" : "🔴 Offline";
    let uptime = botStatus[bot] ? getUptime(bot) : "N/A"; // Use getUptime()
    let ping = botPing[bot] ? `${botPing[bot]}ms` : "N/A";
    let checkedTime = lastChecked[bot] ? lastChecked[bot] : "N/A";

    report += `🤖 <b>${bot}</b>\n`;
    report += `   ├ ⚙️ <b>Status:</b> ${status}\n`;
    report += `   ├ ⏳ <b>Uptime:</b> ${uptime}\n`; // Now properly formatted
    report += `   ├ 📡 <b>Ping:</b> ${ping}\n`;
    report += `   └ 📅 <b>Last Checked:</b> ${checkedTime}\n`;
    report += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  }

  console.log(chalk.cyanBright("[STATUS] Command Triggered"));
  return report;
};

// Export the logStatus function and the getStatusReport function
export default logStatus;
export { getStatusReport };