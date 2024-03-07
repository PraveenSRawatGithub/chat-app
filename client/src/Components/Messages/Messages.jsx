import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import userGetMessages from '../../hooks/userGetMessages'
import MessageSkeleton from '../Skeleton/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

import groupMessagesByDate from '../../Functions/groupMessagesByDate'

export default function Messages() {

  const { loading, messages } = userGetMessages();
  useListenMessages();
  const lastMessageRef = useRef()

  const [groupMessages, setGroupMessages] = useState([])

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behvaior: "smooth" });
    }, 100);

    let result = groupMessagesByDate(messages); 
    setGroupMessages(result);

  }, [messages])


  return (
    <>
      <div className=' px-4 relative flex-1 overflow-auto justify-center items-center text-center'>
        {!loading && messages.length > 0 && groupMessages.map(groupMessage => (
          <div key={groupMessage.date} className=''>
            <div className=' flex justify-center items-center'>
              <h1 className=' bg-gray-200 text-sm w-fit px-3 py-1 rounded-xl'>
                {groupMessage.date === new Date(Date.now()).toDateString() ? "Today" : groupMessage.date}
              </h1>
            </div>

            {groupMessage.messages.map(message => (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            ))}
          </div>
        ))}
        {loading && <MessageSkeleton />}
        {!loading && messages.length === 0 && (
          <p className='text-lg font-semibold'>Let's get chatting! Send a message to start the conversation...</p>
        )}
      </div>
    </>
  );

}
