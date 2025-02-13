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
        amount: amount * 100, // Convert amount to kobo (Paystack requirement)
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

// Wrapper function to process a payment with Paystack
const processPaystackPayment = async (amount, email) => {
  try {
    console.log(chalk.blue("🔄 Initiating Paystack payment..."));
    const paymentResponse = await createPayment(amount, email);

    if (!paymentResponse.data || !paymentResponse.data.reference) {
      throw new Error("No payment reference received.");
    }

    console.log(chalk.green("✅ Payment initiated. Verifying..."));

    // Verify the payment using the reference from the response
    const verificationResponse = await verifyPayment(
      paymentResponse.data.reference
    );

    if (verificationResponse.data.status === "success") {
      console.log(chalk.green("✅ Payment verified successfully!"));
      return verificationResponse.data;
    } else {
      throw new Error("Payment verification failed.");
    }
  } catch (error) {
    console.error(
      chalk.red("❌ Error processing payment with Paystack:"),
      error.message
    );
    throw error;
  }
};

// Export the payment functions
export { createPayment, verifyPayment, processPaystackPayment };
