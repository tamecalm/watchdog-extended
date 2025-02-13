import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/watchdog";
export const SESSION_SECRET = process.env.SESSION_SECRET || "your_secret_key";
export const PORT = process.env.PORT || 3000;
export const FLUTTERWAVE_KEY =
  process.env.FLUTTERWAVE_KEY || "your_flutterwave_key";
export const FLUTTERWAVE_PUBLIC_KEY =
  process.env.FLUTTERWAVE_PUBLIC_KEY || "your_flutterwave_public_key";
export const PAYSTACK_KEY = process.env.PAYSTACK_KEY || "your_paystack_key";
export const CRYPTOCURRENCY_API_KEY =
  process.env.CRYPTOCURRENCY_API_KEY || "your_crypto_api_key";
export const CHAT_ID = process.env.CHAT_ID || "your_chat_id";
export const USER_ID = process.env.USER_ID || "your_user_id";
export const WATCHDOG_BOT_TOKEN =
  process.env.WATCHDOG_BOT_TOKEN || "your_bot_token";

export const PAYMENT_GATEWAY_KEYS = {
  flutterwave: FLUTTERWAVE_KEY,
  flutterwavePublic: FLUTTERWAVE_PUBLIC_KEY,
  paystack: PAYSTACK_KEY,
};
