import axios from "axios";
import notifyAdmins from "./notifyAdmins.js";
import logStatus from "./logStatus.js";
import chalk from "chalk";
import { BOTS, ALERT_LEVELS } from "../../dashboard/config.js";
import User from "../../dashboard/models/userModel.js";

let botStatus = {};
let failureCounts = {};
let botUptime = {};
let botPing = {};
let lastChecked = {};

const getUptime = (botName) => {
  let startTime = botUptime[botName];
  if (!startTime) return "N/A";

  let elapsed = Date.now() - startTime;

  let seconds = Math.floor(elapsed / 1000) % 60;
  let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
  let hours = Math.floor(elapsed / (1000 * 60 * 60)) % 24;
  let days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

  if (days > 0)
    return `${days} day${days > 1 ? "s" : ""}, ${hours} hour${
      hours > 1 ? "s" : ""
    }`;
  if (hours > 0)
    return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${
      minutes > 1 ? "s" : ""
    }`;
  if (minutes > 0)
    return `${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds} second${
      seconds > 1 ? "s" : ""
    }`;
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};

const checkHealth = async () => {
  if (!BOTS || BOTS.length === 0) {
    console.log(chalk.yellow("⚠️ No services configured to monitor."));
    return;
  }

  for (const bot of BOTS) {
    if (!bot.healthUrl) continue;

    const startTime = Date.now();

    try {
      const response = await axios.get(bot.healthUrl, { timeout: 5000 });
      const responseTime = Date.now() - startTime;

      if (response.status === 200) {
        if (botStatus[bot.name] === false) {
          notifyAdmins(`🟢 ${bot.name} is back online.`);
          botUptime[bot.name] = Date.now();
        }

        botStatus[bot.name] = true;
        failureCounts[bot.name] = 0;
        botPing[bot.name] = responseTime;

        if (!botUptime[bot.name]) {
          botUptime[bot.name] = Date.now();
        }

        lastChecked[bot.name] = new Date().toLocaleTimeString();
        logStatus(bot.name, true);
      } else {
        handleFailure(bot);
      }
    } catch (error) {
      handleFailure(bot);
    }
  }
};

const handleFailure = (bot) => {
  failureCounts[bot.name] = (failureCounts[bot.name] || 0) + 1;

  let failureCount = failureCounts[bot.name];
  botPing[bot.name] = "N/A";
  lastChecked[bot.name] = new Date().toLocaleTimeString();

  if (failureCount === ALERT_LEVELS.WARNING_1) {
    notifyAdmins(`🟡 ${bot.name} might be down!`);
  } else if (failureCount === ALERT_LEVELS.WARNING_2) {
    notifyAdmins(`🟠 ${bot.name} is still unresponsive!`);
  } else if (failureCount >= ALERT_LEVELS.CRITICAL) {
    if (botStatus[bot.name] !== false) {
      notifyAdmins(`🔴 ${bot.name} is DOWN!`);
      botStatus[bot.name] = false;
    }
  }

  logStatus(bot.name, false);
};

const checkUserMonitors = async (userId) => {
  const user = await User.findById(userId);
  if (user && user.monitors) {
    for (const monitor of user.monitors) {
      // Check health for each user's monitor
      const bot = BOTS.find((b) => b.name === monitor.name);
      if (bot) {
        await checkHealth(bot);
      }
    }
  }
};

export default checkHealth;
export {
  botStatus,
  botUptime,
  botPing,
  lastChecked,
  getUptime,
  checkUserMonitors,
};
