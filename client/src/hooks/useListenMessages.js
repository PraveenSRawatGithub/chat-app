import React, { useEffect } from 'react';
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useGetConversations from './useGetConversations';

import notificationSoundFile from '../sounds/notification.mp3'

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { conversations } = useGetConversations();

  const notificationSound = new Audio(notificationSoundFile); 

  const getSenderName = (senderId) => {
    let senderName = null;
    conversations.forEach(element => {
      if (element._id === senderId) {
        senderName = element.username;
      }
    });
    return senderName; 
  };

  const { messages, setMessages, selectedConversation, newMessageCollection, setNewMessageCollection } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedConversation?._id) {
        setMessages([...messages, newMessage]);
      }
      else {
        let senderName = getSenderName(newMessage.senderId);
        toast.success(senderName + ": " + newMessage.message, {
          duration: 4000, 
          position: 'top-left',
          style: { 
            backgroundColor: '#FAFAFA',
            color: 'black', 
            fontWeight: '600'
          },
          icon: false
        });
        setNewMessageCollection(newMessage.senderId);
        notificationSound.play();
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation, getSenderName, setNewMessageCollection]);
};

export default useListenMessages;
