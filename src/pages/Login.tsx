import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {auth, provider} from '../config/firebase'
import { signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {motion} from "framer-motion"



const Login = () => {
  
  const navigate = useNavigate(); 

  const signIn = async () => {
      const result = await signInWithPopup(auth, provider)
      navigate('/')
  }


  return (
    <div className='text-center p-4 text-white h-screen'>
        <h1 className='text-2xl'>Login with google to set up your FamilyGram account!</h1>
        <br /><br />
        <button 
           onClick={signIn} className='text-[110px] transition ease-in-out delay-400 hover:-translate-y-1 hover:scale-110 hover:text-slate-600 duration-500 ...'>
          <AiFillGoogleCircle />
          </button>
    </div>
  )
}

export default Login