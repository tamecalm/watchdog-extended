import PaymentModel from '../models/paymentModel.js';
import UserModel from '../models/userModel.js';
import { processFlutterwavePayment, processPaystackPayment, processCryptoPayment } from '../services/paymentGateways';
import chalk from 'chalk';

const createPayment = async (req, res) => {
  const { userId, amount, paymentMethod } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let paymentResult;
    switch (paymentMethod) {
      case 'flutterwave':
        paymentResult = await processFlutterwavePayment(amount);
        break;
      case 'paystack':
        paymentResult = await processPaystackPayment(amount);
        break;
      case 'cryptocurrency':
        paymentResult = await processCryptoPayment(amount);
        break;
      default:
        return res.status(400).json({ message: 'Invalid payment method' });
    }

    const paymentRecord = new PaymentModel({
      userId,
      amount,
      paymentMethod,
      status: paymentResult.status,
      transactionId: paymentResult.transactionId,
    });

    await paymentRecord.save();
    res.status(201).json({ message: 'Payment processed successfully', paymentRecord });
  } catch (error) {
    console.error(chalk.red('Payment processing error:', error));
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
};

const getPaymentHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const payments = await PaymentModel.find({ userId });
    res.status(200).json(payments);
  } catch (error) {
    console.error(chalk.red('Error fetching payment history:', error));
    res.status(500).json({ message: 'Failed to fetch payment history', error: error.message });
  }
};

export { createPayment, getPaymentHistory };