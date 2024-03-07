import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup'

export default function Signup() {

    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs);

        // setInputs({
        //     fullname: '',
        //     username: '',
        //     password: '',
        //     confirmPassword: '',
        //     gender: ''
        // })
    }


    return (
        <div className=' flex flex-col items-center justify-items-center min-w-96 mx-auto border-[1px] rounded-md'>
            <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className=' text-3xl font-semibold text-center text-gray-300 '>SignUp  <span className=' text-blue-400'> ChatApp</span></h1>


                <form onSubmit={handleSubmit}>
                    <div className=' my-2 '>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Full Name</span>
                        </label>
                        <input value={inputs.fullname} onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }} type="text" placeholder='Enter fullname' className='w-full input input-bordered h-10' />
                    </div>

                    <div className=' my-2'>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Username</span>
                        </label>
                        <input value={inputs.username} onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }} type="text" placeholder='Enter Username' className='w-full input input-bordered h-10' />
                    </div>

                    <div className='flex my-2'>
                        <div className=' form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text '>Male</span>
                                <input checked={inputs.gender === "male"} onChange={() => handleCheckboxChange("male")} type="checkbox" className=' checkbox border-slate-900 bg-gray-700' />
                            </label>
                        </div>
                        <div className=' form-control'>
                            <label className='label gap-2 cursor-pointer'>
                                <span className='label-text '>Female</span>
                                <input checked={inputs.gender === "female"} onChange={() => handleCheckboxChange("female")} type="checkbox" className=' checkbox border-slate-900 bg-gray-700' />
                            </label>
                        </div>
                    </div>

                    <div className=' my-2'>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Password</span>
                        </label>
                        <input value={inputs.password} onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }} type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' />
                    </div>

                    <div className=' my-2'>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>Confirm Password</span>
                        </label>
                        <input value={inputs.confirmPassword} onChange={(e) => { setInputs({ ...inputs, confirmPassword: e.target.value }) }} type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' />
                    </div>

                    <div className=' text-sm mt-2 inline-block'>
                        Already have an account? <Link to='/login' className=' hover:underline hover:text-blue-500'>Login</Link>
                    </div>

                    <div className=' my-2'>
                        <button disabled={loading} type='submit' className=' btn btn-outline btn-primary btn-block'>
                            {loading ? <span className=' loading loading-spinner'></span> : "SignUp" }
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
