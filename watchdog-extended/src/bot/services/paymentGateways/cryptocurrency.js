import axios from "axios"; // Import axios for making HTTP requests
import chalk from "chalk"; // Import chalk for colored console logs
import { USER_ID, CHAT_ID } from "../../../config.js"; // Import user and chat IDs for notifications
import notifyAdmins from "../notifyAdmins.js"; // Import the notifyAdmins function

// Function to process cryptocurrency payments
const processCryptoPayment = async (userId, amount, currency) => {
  try {
    // Here you would integrate with a cryptocurrency payment API
    const response = await axios.post("https://api.crypto-payment-gateway.com/pay", {
      userId,
      amount,
      currency,
    });

    if (response.data.success) {
      console.log(chalk.green(`Payment of ${amount} ${currency} successful for user ${userId}.`));
      // Notify admins about the successful payment
      notifyAdmins(`💰 User ${userId} has made a successful payment of ${amount} ${currency}.`);
      return response.data.transactionId; // Return the transaction ID
    } else {
      console.error(chalk.red(`Payment failed: ${response.data.message}`));
      return null; // Return null if payment fails
    }
  } catch (error) {
    console.error(chalk.red(`Error processing payment: ${error.message}`));
    return null; // Return null on error
  }
};

// Function to check payment status
const checkPaymentStatus = async (transactionId) => {
  try {
    const response = await axios.get(`https://api.crypto-payment-gateway.com/payment-status/${transactionId}`);
    
    if (response.data.success) {
      console.log(chalk.green(`Payment status for transaction ${transactionId}: ${response.data.status}`));
      return response.data.status; // Return the payment status
    } else {
      console.error(chalk.red(`Failed to retrieve payment status: ${response.data.message}`));
      return null; // Return null if status retrieval fails
    }
  } catch (error) {
    console.error(chalk.red(`Error checking payment status: ${error.message}`));
    return null; // Return null on error
  }
};

// Export the payment processing functions
export { processCryptoPayment, checkPaymentStatus };