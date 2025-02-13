import express from "express";
import {
  processFlutterwavePayment,
  processPaystackPayment,
  processCryptoPayment,
} from "../../bot/services/paymentGateways/index.js";
import { verifyUser } from "../controllers/authController";

const router = express.Router();

// Route for processing Flutterwave payments
router.post("/flutterwave", verifyUser, async (req, res) => {
  try {
    const paymentDetails = await processFlutterwavePayment(req.body);
    res.status(200).json(paymentDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment processing failed", error: error.message });
  }
});

// Route for processing Paystack payments
router.post("/paystack", verifyUser, async (req, res) => {
  try {
    const paymentDetails = await processPaystackPayment(req.body);
    res.status(200).json(paymentDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment processing failed", error: error.message });
  }
});

// Route for processing cryptocurrency payments
router.post("/crypto", verifyUser, async (req, res) => {
  try {
    const paymentDetails = await processCryptoPayment(req.body);
    res.status(200).json(paymentDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment processing failed", error: error.message });
  }
});

// Route for handling subscription management
router.post("/subscribe", verifyUser, async (req, res) => {
  // Logic for managing subscriptions
  res.status(200).json({ message: "Subscription processed successfully" });
});

export default router;
