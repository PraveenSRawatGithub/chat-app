import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti"
import chatImg from "../../assets/chat-img.png"
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from "../../context/SocketContext"

export default function MessageContainer() {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    useEffect(() => {

        // cleanup function (unmounts)
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className=' w-full flex flex-col border-l-2 border-gray-200 bg-[#FFFAFA]'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className=' bg-slate-800 px-4 py-2 mb-2 text-white font-semibold flex items-center gap-3 rounded-b-md'>
                        <img className=' w-9 h-9' src={selectedConversation.profilePic} alt="" />
                        <div className=' flex flex-col '>
                            <span className=' font-bold text-lg'>{selectedConversation.username}</span>
                            {onlineUsers.includes(selectedConversation._id) && <span className=' font-semibold text-sm'>online</span>}
                        </div>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}


const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg text-gray-600 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser.username}</p>
                <p>Select a chat to start messaging</p>
                <img className='w-44 m-8' src={chatImg} alt="" />
            </div>
        </div>
    )
}
