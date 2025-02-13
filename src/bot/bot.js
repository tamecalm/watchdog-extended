import TelegramBot from "node-telegram-bot-api";
import { getStatusReport } from "./services/logStatus.js";
import {
  handleAddMonitor,
  handleRemoveMonitor,
  handleListMonitors,
  handleManageMonitor,
  handleManageSubscription,
  handleManageSettings,
} from "./commands/manageMonitors.js";

import { getStats } from "../bot/services/monitorManagement.js"; // Import getStats function
import { WATCHDOG_BOT_TOKEN } from "../dashboard/config.js";

const bot = new TelegramBot(WATCHDOG_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to the Watchdog Bot! Use /help to see available commands."
  );
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Available commands:\n/manage - Manage your monitors\n/stats - View uptime statistics\n/subscriptions - Manage your subscriptions\n/settings - Update your settings"
  );
});

// ✅ Add monitors
bot.onText(/\/addmonitor (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const monitorUrl = match[1]; // Extract URL from command
  handleAddMonitor(chatId, monitorUrl);
});

// ✅ Remove monitors
bot.onText(/\/removemonitor (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const monitorUrl = match[1]; // Extract URL from command
  handleRemoveMonitor(chatId, monitorUrl);
});

// ✅ List all monitors
bot.onText(/\/listmonitors/, (msg) => {
  const chatId = msg.chat.id;
  handleListMonitors(chatId);
});

// ✅ Enable/Disable a specific monitor
bot.onText(/\/manage (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const monitorUrl = match[1]; // Extract URL from command
  handleManageMonitor(chatId, monitorUrl);
});

// ✅ Get stats
bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const stats = await getStats(chatId);
  bot.sendMessage(chatId, JSON.stringify(stats, null, 2));
});

// ✅ Manage subscriptions
bot.onText(/\/subscriptions/, (msg) => {
  const chatId = msg.chat.id;
  handleManageSubscription(chatId);
});

// ✅ Manage settings
bot.onText(/\/settings/, (msg) => {
  const chatId = msg.chat.id;
  handleManageSettings(chatId);
});

// ✅ Get system status
bot.onText(/\/status/, async (msg) => {
  const chatId = msg.chat.id;
  const report = await getStatusReport();
  bot.sendMessage(chatId, report, { parse_mode: "HTML" });
});

export default bot;
export { bot };
