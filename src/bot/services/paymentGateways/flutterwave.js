import axios from "axios"; // Import axios for HTTP requests
import {
  FLUTTERWAVE_SECRET_KEY,
  FLUTTERWAVE_PUBLIC_KEY,
} from "../../config.js"; // Import Flutterwave keys
import chalk from "chalk"; // Import chalk for colored console logs

// Function to initiate a payment with Flutterwave
const initiatePayment = async (amount, email, tx_ref) => {
  const url = "https://api.flutterwave.com/v3/charges?type=mobilemoneyghana";
  const headers = {
    Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    tx_ref,
    amount,
    currency: "NGN",
    payment_type: "mobilemoneyghana",
    email,
    redirect_url: "https://your_redirect_url.com",
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(
      chalk.red("❌ Flutterwave payment initiation failed:", error.message)
    );
    throw error;
  }
};

// Function to verify a payment with Flutterwave
const verifyPayment = async (tx_ref) => {
  const url = `https://api.flutterwave.com/v3/charges?tx_ref=${tx_ref}`;
  const headers = {
    Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(
      chalk.red("❌ Flutterwave payment verification failed:", error.message)
    );
    throw error;
  }
};

// Export the payment functions
export { initiatePayment, verifyPayment };
