import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
import useLastMessage from '../../hooks/useLastMessage';
import { useGetUnseenMessages } from '../../hooks/useGetUnseenMessages';

export default function Conversation({ conversation }) {

    const { selectedConversation, setSelectedConversation, messages, newMessageCollection, demo } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const isSelected = selectedConversation?._id === conversation._id;

    const { getLastMessage } = useLastMessage();
    const [lastMessage, setLastMessage] = useState("");

    const { getUnseenMessages } = useGetUnseenMessages();
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            let message = await getLastMessage(conversation._id);
            setLastMessage(message);

            let count = await getUnseenMessages(conversation._id);
            setUnseenCount(parseInt(count));
        }
        fetchData();
    }, [messages, newMessageCollection, demo])

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 mr-1 py-1 cursor-pointer
            ${isSelected ? "bg-gray-300 text-white" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline && 'online'} `}>
                    <div className=' w-12 rounded-full '>
                        <img src={conversation.profilePic} alt="https://avatar.iran.liara.run/public/34" />
                    </div>
                </div>

                <div className=' flex flex-col flex-1'>
                    <div className=' flex justify-between'>
                        <p className=' font-bold text-gray-700'> {conversation.username} </p>
                    </div>

                    <div className=' flex  justify-between items-center'>
                        <div>
                            {lastMessage &&
                                <p className=' text-gray-700 text-sm'>{lastMessage.substring(0, 27)}</p>
                            }
                        </div>
                        {unseenCount !== 0 &&
                            <div>
                                <p className=' bg-blue-600 text-white px-1 text-xs rounded-full '> {unseenCount} </p>
                            </div>
                        }
                    </div>
                </div>
            </div >

            <div className=' divider my-0 py-0 h-1'> </div>
        </>
    )
}
