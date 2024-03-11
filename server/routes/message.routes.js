import express from "express";
import { getMessages, sendMessage, getLastMessage, updateSeenStatus, getUnseenMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/getLastMessage/:id", protectRoute, getLastMessage);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/updateSeenStatus/:messageId", protectRoute, updateSeenStatus);
router.get("/getUnseenMessages/:id", protectRoute, getUnseenMessages);


export default router;