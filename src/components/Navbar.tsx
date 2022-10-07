import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'


const Navbar = () => {

    const [user] = useAuthState(auth)

    const signUserOut = async() => {
           await signOut(auth)
    }

  return (
    <nav className='flex justify-between p-7 bg-slate-800 text-white'>
        <div><h1 className='font-CursiveFont md:text-xl lg:text-xl'>FGram</h1></div>
        <div className='space-x-3 font-NavFont text-xl'>
        <Link className='duration-500 hover:text-blue-900 xs:text-[16px] md:text-xl lg:text-xl' to='/'>Home</Link>
        {!user?
        <Link className='duration-500 hover:text-blue-900 xs:text-[18px] md:text-xl lg:text-xl' to='/login'>Login</Link>:
         <Link className='duration-500 hover:text-blue-900 xs:text-[16px] md:text-xl lg:text-xl' to='/post'>Post</Link>}
        </div>
        <div>
        {user && <img className='rounded-xl' src={auth.currentUser?.photoURL || " "} width="50" height="50"/>}
        {user && <button onClick={signUserOut} 
        className='duration-500 text-[13px] bg-slate-400
         hover:bg-blue-900 text-white font-bold
          py-1 px-1 rounded-full'>
            Log out
            </button>
            }
        </div>
    </nav>
  )
}

export default Navbar