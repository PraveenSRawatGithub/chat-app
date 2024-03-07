import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations';
import {useSocketContext} from "../../context/SocketContext"

export default function NewMessages() {
    const [reload, setRealod] = useState(0);
    const { conversations } = useGetConversations();
    const { newMessageCollection, setNewMessageCollection, selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        // Filter conversations based on newMessageCollection IDs
        const filteredMessages = conversations.filter(conversation => newMessageCollection.includes(conversation._id));
        setNewMessage(filteredMessages);
    }, [conversations, newMessageCollection]);

    return (
        <>
            {newMessage.length > 0 &&
                <div>
                    <div className='flex items-center gap-4'>
                        <button className='text-center' onClick={() => setRealod(reload => reload + 1)}><img className=' w-7 h-7' src='https://cdn-icons-png.flaticon.com/128/9464/9464081.png'></img></button>
                        <h1 className=' font-semibold'>New Messages</h1>
                    </div>
                    {
                        newMessage.map(item => {
                            return (
                                <div key={item._id} className='mt-1'>
                                    <div className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 py-1 cursor-pointer `}
                                        onClick={() => setSelectedConversation(item)}>
                                        <div className=' bg-blue-500 p-1 rounded-full animate-pulse'></div>
                                        <div className={`avatar }`}>
                                            <div className=' w-12 rounded-full'>
                                                <img src={item.profilePic} alt="https://avatar.iran.liara.run/public/34" />
                                            </div>
                                            {/* {isOnline && <div className='bg-green-500 w-2 h-2 rounded-full relative right-3 animate-pulse'></div>} */}
                                        </div>

                                        <div className=' flex flex-col flex-1'>
                                            <div className=' flex flex-col'>
                                                <p className=' font-bold text-gray-700'> {item.username} </p>
                                                {onlineUsers.includes(item._id) && <p className=' text-blue-700'>online</p>}
                                            </div>
                                        </div>
                                    </div >

                                    <div className=' divider my-0 py-0 h-1'> </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}
