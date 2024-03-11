import React from 'react'
import useLogout from '../../hooks/useLogout'

export default function DropDown() {
    const { logout } = useLogout();
  return (
    <>
          <div className="dropdown">
              <div tabIndex={0} role="" className=" m-1 bg-white w-fit">
                  <div className="relative">
                      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a2 2 0 100-4 2 2 0 000 4zM12 12a2 2 0 100-4 2 2 0 000 4zM12 20a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                      </button>
                  </div>
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-[#212121] rounded-box w-28">
                  <li className=' cursor-pointer hover:bg-[#424242] text-white text-sm p-2 rounded-md'>New Group</li>
                  <li onClick={logout} className=' cursor-pointer hover:bg-[#424242] text-white text-sm p-2 rounded-md'>Logout</li>
              </ul>
          </div>
    </>
  )
}
