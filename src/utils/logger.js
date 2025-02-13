import fs from "fs";
import chalk from "chalk";

const logFilePath = "logs/app.log";

// Function to log info messages
const logInfo = (message) => {
  const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(chalk.green(logMessage.trim()));
};

// Function to log warning messages
const logWarning = (message) => {
  const logMessage = `[WARNING] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(chalk.yellow(logMessage.trim()));
};

// Function to log error messages
const logError = (message) => {
  const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.error(chalk.red(logMessage.trim()));
};

// Function to log debug messages
const logDebug = (message) => {
  const logMessage = `[DEBUG] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(chalk.cyan(logMessage.trim()));
};

// Exporting the logging functions
const logger = {
  logInfo,
  logWarning,
  logError,
  logDebug,
};

export default logger;
