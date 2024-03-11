import React from 'react'

export default function UserInfo() {
    let userData = localStorage.getItem("chat-user");
    let user = JSON.parse(userData);

    return (
        <>
            <div className=' flex gap-3 items-center my-2'>
                <div className='avatar w-10 rounded-full'><img className=' shadow-md shadow-gray-400 rounded-full' src={user.profilePic} alt="" /></div>
                <div className=' text-lg font-bold text-[#424242]'>{user.fullname}</div>
            </div>
        </>
    )
}
