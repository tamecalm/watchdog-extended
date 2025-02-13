import express from "express"; 
import { 
  addMonitor, 
  removeMonitor, 
  listMonitors 
} from "../controllers/monitorController.js"; 

const router = express.Router(); 

// Route to add a new monitor 
router.post("/add", addMonitor); 

// Route to remove a monitor 
router.delete("/remove/:id", removeMonitor); 

// Route to list all monitors for the user 
router.get("/", listMonitors); 

export default router; 