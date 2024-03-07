import React, { useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import useLogout from '../../hooks/useLogout';

export default function LogoutButton() {

    const { loading, logout } = useLogout();

    return (
        <div className='mt-1'>
            {!loading ? (
                <>
                    <IoMdLogOut onClick={logout} className='text-2xl hover:cursor-pointer' />
                </>
            ) : (
                <span className="loading loading-spinner"></span>
            )
            }
        </div>
    )
}
