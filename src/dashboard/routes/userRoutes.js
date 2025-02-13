import express from "express";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../controllers/userController.js";

const router = express.Router();

// Route to get user profile
router.get("/profile", getUserProfile);

// Route to update user profile
router.put("/profile", updateUserProfile);

// Route to delete user account
router.delete("/account", deleteUserAccount);

export default router;