import { getUserMonitors, getUptimeStats } from '../services/userManagement.js'; // Import user management functions
import { formatUptime } from '../../utils/logger.js'; // Import utility for formatting uptime
import chalk from 'chalk'; // Import chalk for colored console logs

// Function to handle the /stats command
const statsCommand = async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const monitors = await getUserMonitors(userId); // Retrieve user's monitors
    if (!monitors || monitors.length === 0) {
      return bot.sendMessage(chatId, "You have no monitors set up.");
    }

    let statsReport = "📊 <b>Uptime Statistics</b>\n";
    statsReport += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";

    for (const monitor of monitors) {
      const uptime = await getUptimeStats(monitor.id); // Get uptime stats for each monitor
      statsReport += `🤖 <b>${monitor.name}</b>\n`;
      statsReport += `   ├ ⏳ <b>Uptime:</b> ${formatUptime(uptime)}\n`;
      statsReport += `   └ 📅 <b>Last Checked:</b> ${new Date().toLocaleTimeString()}\n`;
      statsReport += "━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    }

    console.log(chalk.cyanBright("[STATS] Command Triggered"));
    return bot.sendMessage(chatId, statsReport, { parse_mode: "HTML" });
  } catch (error) {
    console.error(chalk.red("❌ Error fetching stats:", error.message));
    return bot.sendMessage(chatId, "An error occurred while fetching your stats.");
  }
};

// Export the stats command function
export default statsCommand;