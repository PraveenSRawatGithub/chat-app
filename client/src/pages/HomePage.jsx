import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import MessageContainer from '../Components/Messages/MessageContainer'

export default function HomePage() {
  return (
    <>
      <div className=' flex w-[75%] sm:h-[455px] md:h-[600px] rounded-lg overflow-hidden bg-[#FFFAFA] shadow-2xl shadow-blue-950 text-black  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacty-0'>
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  )
}


// messages - edit, delete, reply

// user typing status
// file sharing