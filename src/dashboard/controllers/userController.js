import User from "../models/userModel.js";
import chalk from "chalk";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(chalk.red("Error fetching user profile:", error));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, notificationPreferences } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, notificationPreferences },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(chalk.red("Error updating user profile:", error));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user || !(await comparePassword(currentPassword, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(chalk.red("Error changing password:", error));
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Fix: Add missing deleteUserAccount function**
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(chalk.red("Error deleting user account:", error));
    res.status(500).json({ message: "Internal server error" });
  }
};
