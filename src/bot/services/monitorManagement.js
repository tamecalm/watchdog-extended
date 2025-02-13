import User from "../../dashboard/models/userModel.js";

// Function to get user monitors
const getUserMonitors = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user.monitors || [];
  } catch (error) {
    console.error(`Failed to get monitors: ${error.message}`);
    throw error;
  }
};

// Function to add a monitor for a user
const addUserMonitor = async (userId, monitorUrl) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    user.monitors = user.monitors || [];
    user.monitors.push({ url: monitorUrl, enabled: true }); // Store monitors as objects with 'enabled' status
    await user.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to remove a monitor for a user
const removeUserMonitor = async (userId, monitorUrl) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    user.monitors = user.monitors?.filter(
      (monitor) => monitor.url !== monitorUrl
    );
    await user.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to toggle a monitor's status (Enable/Disable)
const toggleMonitorStatus = async (userId, monitorUrl) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    // Find the monitor and toggle its status
    const monitor = user.monitors.find((m) => m.url === monitorUrl);
    if (!monitor) return { success: false, message: "Monitor not found" };

    monitor.enabled = !monitor.enabled; // Toggle enabled status
    await user.save();

    return { success: true, enabled: monitor.enabled };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to get monitoring stats
const getStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Simulated stats - replace with actual logic
    const stats = {
      totalMonitors: user.monitors.length || 0,
      lastChecked: new Date().toLocaleString(),
    };

    return stats;
  } catch (error) {
    console.error(`Failed to get stats: ${error.message}`);
    return { error: error.message };
  }
};

const updateUserSubscription = async (userId, newPlan) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    user.subscriptionPlan = newPlan; // Update subscription plan
    await user.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateUserSettings = async (userId, newSettings) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    user.settings = { ...user.settings, ...newSettings }; // Merge new settings
    await user.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export monitor functions
export {
  getUserMonitors,
  addUserMonitor,
  removeUserMonitor,
  toggleMonitorStatus,
  getStats,
  updateUserSubscription,
  updateUserSettings,
};
