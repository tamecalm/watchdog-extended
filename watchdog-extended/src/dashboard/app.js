import express from "express"; 
import mongoose from "mongoose"; 
import session from "express-session"; 
import passport from "passport"; 
import { initPassport } from "./config.js"; 
import authRoutes from "./routes/authRoutes.js"; 
import monitorRoutes from "./routes/monitorRoutes.js"; 
import paymentRoutes from "./routes/paymentRoutes.js"; 
import userRoutes from "./routes/userRoutes.js"; 
import { logger } from "../utils/logger.js"; 
import path from "path"; 

const app = express(); 

// Middleware setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: "your_secret_key", resave: false, saveUninitialized: true })); 
app.use(passport.initialize()); 
app.use(passport.session()); 

// Set view engine
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => logger.info("MongoDB connected")) 
  .catch(err => logger.error("MongoDB connection error:", err)); 

// Initialize Passport
initPassport(passport); 

// Routes
app.use("/auth", authRoutes); 
app.use("/monitors", monitorRoutes); 
app.use("/payments", paymentRoutes); 
app.use("/user", userRoutes); 

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
  logger.info(`Dashboard server is running on port ${PORT}`); 
}); 