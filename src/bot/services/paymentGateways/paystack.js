import axios from "axios"; // Import axios for making HTTP requests
import { PAYSTACK_SECRET_KEY } from "../../../dashboard/config.js"; // Import Paystack secret key from config
import chalk from "chalk"; // Import chalk for colored console logs

// Function to create a payment request
const createPayment = async (amount, email) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      chalk.red("❌ Error creating payment with Paystack:"),
      error.message
    );
    throw error;
  }
};

// Function to verify a payment
const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      chalk.red("❌ Error verifying payment with Paystack:"),
      error.message
    );
    throw error;
  }
};

// Export the payment functions
export { createPayment, verifyPayment };
