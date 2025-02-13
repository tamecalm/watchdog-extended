import User from "../../dashboard/models/userModel.js"; // Import the User model
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import chalk from "chalk"; // Import chalk for colored console logs

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT

// Function to register a new user
const registerUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save the user to the database
    console.log(chalk.green(`User ${username} registered successfully.`));
    return newUser;
  } catch (error) {
    console.error(chalk.red(`Failed to register user: ${error.message}`));
    throw error;
  }
};

// Function to authenticate a user
const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username }); // Find the user by username
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" }); // Generate JWT
    console.log(chalk.green(`User ${username} authenticated successfully.`));
    return token;
  } catch (error) {
    console.error(chalk.red(`Authentication failed: ${error.message}`));
    throw error;
  }
};

// Function to get user details
const getUserDetails = async (userId) => {
  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(chalk.red(`Failed to get user details: ${error.message}`));
    throw error;
  }
};

// Function to update user settings
const updateUserSettings = async (userId, settings) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, settings, { new: true }); // Update user settings
    if (!updatedUser) {
      throw new Error("User not found");
    }
    console.log(chalk.green(`User settings updated successfully.`));
    return updatedUser;
  } catch (error) {
    console.error(chalk.red(`Failed to update user settings: ${error.message}`));
    throw error;
  }
};

// Export the user management functions
export { registerUser, authenticateUser, getUserDetails, updateUserSettings };