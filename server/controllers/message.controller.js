import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Types } from 'mongoose';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateSeenStatus = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findByIdAndUpdate(messageId, { seen: true }, { new: true });

        const { _id, seen } = message;

        res.status(200).json({ _id, seen });
    } catch (error) {
        console.log("Error in updateSeenStatus controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getLastMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        const lastMessage = messages[messages.length - 1]

        res.status(200).json(lastMessage)
    }
    catch (error) {
        console.log("Error in getLastMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUnseenMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const currentUserId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [currentUserId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({ unseen: 0 })
        }

        const messages = conversation.messages;
        const userToChatIdObject = new Types.ObjectId(userToChatId); // Convert userToChatId to ObjectId

        const unseenMessages = messages.filter(item => (item.seen === false && item.senderId.equals(userToChatIdObject)));
        res.status(200).json({ unseen: unseenMessages.length.toString() })

    } catch (error) {
        console.log("Error in getUnseenMessages controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}