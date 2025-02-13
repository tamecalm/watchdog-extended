import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/watchdog';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'your_secret_key';
export const PORT = process.env.PORT || 3000; 
export const FLUTTERWAVE_KEY = process.env.FLUTTERWAVE_KEY || 'your_flutterwave_key';
export const PAYSTACK_KEY = process.env.PAYSTACK_KEY || 'your_paystack_key';
export const CRYPTOCURRENCY_API_KEY = process.env.CRYPTOCURRENCY_API_KEY || 'your_crypto_api_key';