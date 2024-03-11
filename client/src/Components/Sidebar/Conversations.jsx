import React, { useEffect } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';

export default function Conversations() {
  const { loading, conversations } = useGetConversations();

  return (
    <div className=' flex flex-col '>

      <h1 className='m-2 font-semibold'>Chats</h1>

      {loading ? <span className=' loading loading-spinner'></span> :
        (
          conversations.map(item => {
            return (
              <Conversation key={item._id} conversation={item} />
            )
          })
        )}

    </div>
  )
}
