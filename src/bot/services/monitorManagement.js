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
    user.monitors.push(monitorUrl);
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

    user.monitors = user.monitors?.filter((monitor) => monitor !== monitorUrl);
    await user.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export monitor functions
export { getUserMonitors, addUserMonitor, removeUserMonitor };
