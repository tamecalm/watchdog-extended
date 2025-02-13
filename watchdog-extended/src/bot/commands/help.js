import { bot } from "../services/userManagement.js"; // Import user management functions
import chalk from "chalk"; // Import chalk for colored console logs

// Help command function
const helpCommand = (chatId) => {
  const helpMessage = `
  📚 *Help Menu*
  
  Here are the commands you can use:
  
  /start - Start the bot and get an introduction.
  /help - Show this help message.
  /manage - Manage your monitors (add, remove, list).
  /stats - View uptime statistics for your monitors.
  /subscriptions - Manage your subscription plans.
  /settings - Update your notification preferences and account details.
  
  If you need further assistance, feel free to reach out!
  `;
  
  bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" })
    .then(() => {
      console.log(chalk.cyan("[HELP] Help message sent."));
    })
    .catch((error) => {
      console.error(chalk.red("❌ Failed to send help message:", error.message));
    });
};

// Export the help command function
export default helpCommand;