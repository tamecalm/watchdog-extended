import axios from "axios"; // Import axios for HTTP requests
import {
  FLUTTERWAVE_SECRET_KEY,
  FLUTTERWAVE_PUBLIC_KEY,
} from "../../../dashboard/config.js"; // Import Flutterwave keys
import chalk from "chalk"; // Import chalk for colored console logs

// Function to initiate a payment with Flutterwave
const initiatePayment = async (amount, email, tx_ref) => {
  const url = "https://api.flutterwave.com/v3/payments"; // Correct endpoint for payment initiation
  const headers = {
    Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`, // Secret key for backend authentication
    "Content-Type": "application/json",
  };

  const data = {
    tx_ref,
    amount,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd", // Payment methods
    customer: {
      email,
    },
    redirect_url: "https://your_redirect_url.com",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log(chalk.green("✅ Payment initiated successfully"));
    return response.data; // Returns the entire response
  } catch (error) {
    console.error(
      chalk.red(
        "❌ Flutterwave payment initiation failed:",
        error.response?.data || error.message
      )
    );
    throw error;
  }
};

// Function to verify a payment with Flutterwave
const verifyPayment = async (transaction_id) => {
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  const headers = {
    Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(chalk.green("✅ Payment verification successful"));
    return response.data;
  } catch (error) {
    console.error(
      chalk.red(
        "❌ Flutterwave payment verification failed:",
        error.response?.data || error.message
      )
    );
    throw error;
  }
};

// Wrapper function to process a payment with Flutterwave
const processFlutterwavePayment = async (amount, email, tx_ref) => {
  try {
    const paymentResponse = await initiatePayment(amount, email, tx_ref);

    // Extract transaction ID from the payment response
    const transaction_id = paymentResponse?.data?.id;
    if (!transaction_id) {
      throw new Error("Transaction ID not found in the response");
    }

    const verificationResponse = await verifyPayment(transaction_id);
    return verificationResponse;
  } catch (error) {
    console.error(chalk.red("❌ Payment processing failed:", error.message));
    throw error;
  }
};

// Export the payment functions
export { initiatePayment, verifyPayment, processFlutterwavePayment };
