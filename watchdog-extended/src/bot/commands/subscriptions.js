import { getUserSubscription, updateUserSubscription } from '../services/userManagement.js';
import { notifyAdmins } from '../services/notifyAdmins.js';
import chalk from 'chalk';

// Function to view current subscription plan
const viewSubscription = async (userId) => {
  const subscription = await getUserSubscription(userId);
  if (subscription) {
    return `📅 Your current subscription plan: ${subscription.plan}\n💳 Status: ${subscription.status}`;
  } else {
    return '🚫 You do not have an active subscription.';
  }
};

// Function to upgrade subscription
const upgradeSubscription = async (userId, newPlan) => {
  const result = await updateUserSubscription(userId, newPlan);
  if (result.success) {
    notifyAdmins(`🔔 User ${userId} upgraded to ${newPlan} plan.`);
    return `✅ Successfully upgraded to ${newPlan} plan.`;
  } else {
    return `❌ Failed to upgrade subscription: ${result.message}`;
  }
};

// Function to downgrade subscription
const downgradeSubscription = async (userId, newPlan) => {
  const result = await updateUserSubscription(userId, newPlan);
  if (result.success) {
    notifyAdmins(`🔔 User ${userId} downgraded to ${newPlan} plan.`);
    return `✅ Successfully downgraded to ${newPlan} plan.`;
  } else {
    return `❌ Failed to downgrade subscription: ${result.message}`;
  }
};

// Exporting the functions
export { viewSubscription, upgradeSubscription, downgradeSubscription };