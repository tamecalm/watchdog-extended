import dotenv from "dotenv";

dotenv.config();

// Define the alert levels
export const ALERT_LEVELS = {
  WARNING_1: 1, // First warning after 1 failure
  WARNING_2: 2, // Second warning after 2 failures
  CRITICAL: 3, // Critical alert after 3 failures
};

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/watchdog";
export const SESSION_SECRET = process.env.SESSION_SECRET || "your_secret_key";
export const PORT = process.env.PORT || 3000;
export const FLUTTERWAVE_SECRET_KEY =
  process.env.FLUTTERWAVE_SECRET_KEY || "your_flutterwave_secret_key";
export const FLUTTERWAVE_PUBLIC_KEY =
  process.env.FLUTTERWAVE_PUBLIC_KEY || "your_flutterwave_public_key";
export const PAYSTACK_SECRET_KEY =
  process.env.PAYSTACK_SECRET_KEY || "your_paystack_key";
export const CRYPTOCURRENCY_API_KEY =
  process.env.CRYPTOCURRENCY_API_KEY || "your_crypto_api_key";
export const CHAT_ID = process.env.CHAT_ID || "your_chat_id";
export const USER_ID = process.env.USER_ID || "your_user_id";
export const WATCHDOG_BOT_TOKEN =
  process.env.WATCHDOG_BOT_TOKEN || "your_bot_token";

export const PAYMENT_GATEWAY_KEYS = {
  flutterwaveSecret: FLUTTERWAVE_SECRET_KEY,
  flutterwavePublic: FLUTTERWAVE_PUBLIC_KEY,
  paystackSecret: PAYSTACK_SECRET_KEY,
};

export const plans = {
  free: {
    name: "Free Plan",
    features: ["Basic monitoring", "Limited notifications"],
    price: 0,
  },
  paid: {
    name: "Paid Plan",
    features: [
      "Advanced monitoring",
      "Unlimited notifications",
      "Priority support",
    ],
    price: 10, // Monthly subscription price
  },
};

// Array of services to monitor
export const BOTS = [
  {
    name: "IDSync",
    healthUrl: "https://Emerald-Hawk-zfzcbebzw.stackhost.me/health",
  },
  { name: "Bingpay", healthUrl: "https://Bingpay.ng" },
  { name: "InfinityFree", healthUrl: "https://www.infinityfree.com" },
  { name: "Google", healthUrl: "https://www.google.com" },
  { name: "Azure", healthUrl: "https://azure.microsoft.com" },
  { name: "DynamoDB", healthUrl: "https://aws.amazon.com/dynamodb" },
  // More bots can be added here
];

// Define and export initPassport function
export function initPassport() {
  // Your Passport.js initialization code here
}
