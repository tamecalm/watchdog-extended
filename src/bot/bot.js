import TelegramBot from "node-telegram-bot-api";
import { getStatusReport } from "./services/logStatus.js";
import {
  manageMonitors,
  manageSubscriptions,
  manageSettings,
  getStats,
} from "./commands/manageMonitors.js";
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
    "Available commands:\n/help - Show this help message\n/manage - Manage your monitors\n/stats - View uptime statistics\n/subscriptions - Manage your subscriptions\n/settings - Update your settings"
  );
});

bot.onText(/\/manage/, (msg) => {
  const chatId = msg.chat.id;
  manageMonitors(chatId);
});

bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  getStats(chatId);
});

bot.onText(/\/subscriptions/, (msg) => {
  const chatId = msg.chat.id;
  manageSubscriptions(chatId);
});

bot.onText(/\/settings/, (msg) => {
  const chatId = msg.chat.id;
  manageSettings(chatId);
});

bot.onText(/\/status/, async (msg) => {
  const chatId = msg.chat.id;
  const report = await getStatusReport();
  bot.sendMessage(chatId, report, { parse_mode: "HTML" });
});

export default bot;
export { bot };
