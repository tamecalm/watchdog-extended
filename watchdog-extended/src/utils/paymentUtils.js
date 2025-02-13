import axios from "axios";
import chalk from "chalk";

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3/charges?type=mobilemoney";
const PAYSTACK_BASE_URL = "https://api.paystack.co/transaction";
const CRYPTOCURRENCY_BASE_URL = "https://api.crypto-payment-gateway.com/v1/transactions";

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Function to process payment through Flutterwave
export const processFlutterwavePayment = async (amount, email) => {
  try {
    const response = await axios.post(FLUTTERWAVE_BASE_URL, {
      tx_ref: `tx_${Date.now()}`,
      amount,
      currency: "USD",
      email,
      // Additional parameters as required by Flutterwave
    }, {
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(chalk.red("Flutterwave Payment Error:", error.message));
    throw error;
  }
};

// Function to process payment through Paystack
export const processPaystackPayment = async (amount, email) => {
  try {
    const response = await axios.post(`${PAYSTACK_BASE_URL}/initialize`, {
      email,
      amount: amount * 100, // Paystack expects amount in kobo
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(chalk.red("Paystack Payment Error:", error.message));
    throw error;
  }
};

// Function to process cryptocurrency payment
export const processCryptoPayment = async (amount, walletAddress) => {
  try {
    const response = await axios.post(CRYPTOCURRENCY_BASE_URL, {
      amount,
      walletAddress,
      // Additional parameters as required by the cryptocurrency payment gateway
    });
    return response.data;
  } catch (error) {
    console.error(chalk.red("Cryptocurrency Payment Error:", error.message));
    throw error;
  }
};

// Function to validate payment response
export const validatePaymentResponse = (response) => {
  // Implement validation logic based on the payment gateway's response structure
  return response.status === "success"; // Example validation
};