import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { useState } from 'react'

const NavBar = () => {

    const navigate = useNavigate()

    const { setShowRecruiterLogin, setShowUserLogin, userData, setUserData } = useContext(AppContext)

    // Function to logout for user
        const logout = () => {
            setUserData(null)
            localStorage.removeItem('userToken')
            navigate('/')
        }

    return (
        <div className='shadow py-4'>
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                {
                    userData
                        ? <div className='flex items-center gap-3'>
                            <Link to="/applications" className='font-medium'>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden font-medium'>Hi, {userData.name}</p>
                            <div className="relative group">
                                <img className='w-8 border border-gray-200 rounded-full' src={userData.image} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={(e) => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={(e) => setShowUserLogin(true)} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default NavBar