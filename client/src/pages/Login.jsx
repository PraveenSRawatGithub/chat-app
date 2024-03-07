import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin';

export default function Login() {

    const {loading, login} = useLogin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        await login(username, password);
    }


    return (
        <div className=' flex flex-col items-center justify-items-center min-w-96 mx-auto border-[1px] rounded-md'>
            <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className=' text-3xl font-semibold text-center text-gray-300 '>Login  <span className=' text-blue-400'> ChatApp</span></h1>


                <form onSubmit={handleSubmit}>
                    <div className=' my-2'>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Username</span>
                        </label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter Username' className='w-full input input-bordered h-10' />
                    </div>

                    <div className=' my-2'>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Password</span>
                        </label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' />
                    </div>

                    <div className=' text-sm mt-2 inline-block'>
                        Don't have an account? <Link to='/signup' className=' hover:underline hover:text-blue-500'>SignUp</Link>
                    </div>

                    <div className=' my-2'>
                        <button type='submit' className=' btn btn-outline btn-primary btn-block'>
                            {loading ? <span className=' loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
