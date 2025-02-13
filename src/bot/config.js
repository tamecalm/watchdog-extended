import {
  WATCHDOG_BOT_TOKEN,
  CHAT_ID,
  USER_ID,
  MONGODB_URI,
  PAYMENT_GATEWAY_KEYS,
} from "../dashboard/config.js"; // Import necessary configuration constants

export const CONFIG = {
  botToken: WATCHDOG_BOT_TOKEN,
  chatId: CHAT_ID,
  userId: USER_ID,
  mongoUri: MONGODB_URI,
  paymentGateways: {
    flutterwave: PAYMENT_GATEWAY_KEYS.FLUTTERWAVE,
    flutterwavePublic: FLUTTERWAVE_PUBLIC_KEY,
    paystack: PAYMENT_GATEWAY_KEYS.PAYSTACK,
    cryptocurrency: PAYMENT_GATEWAY_KEYS.CRYPTOCURRENCY,
  },
  plans: {
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
  },
};
