import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

export default function Conversation({ conversation }) {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);


    const isSelected = selectedConversation?._id === conversation._id;
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 mr-1 py-1 cursor-pointer
            ${isSelected ? "bg-gray-300 text-white" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar }`}>
                    <div className=' w-12 rounded-full'>
                        <img src={conversation.profilePic} alt="https://avatar.iran.liara.run/public/34" />
                    </div>
                </div>

                <div className=' flex flex-col flex-1'>
                    <div className=' flex flex-col'>
                        <p className=' font-bold text-gray-700'> {conversation.username} </p>
                        { isOnline && <p className=' text-blue-700'>online</p> }
                    </div>
                </div>
            </div >

            <div className=' divider my-0 py-0 h-1'> </div>
        </>
    )
}
