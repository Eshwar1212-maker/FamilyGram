import React from 'react'
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorResponse } from '@remix-run/router';
import {addDoc, collection, deleteDoc} from 'firebase/firestore'
import {db, auth} from "../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom'

interface CreateFormData {
    title: string;
    description: string
}
const Form = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string(),
        description: yup.string().required("Please enter your post"),
    })
const {register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
})
const postsRef = collection(db, "posts")

const onCreatePost = async (data: CreateFormData) => {
  await addDoc(postsRef, {
    ...data,
    username: user?.displayName,
    userId: user?.uid,
  })
  navigate('/')
}
  return (
    
    <form onSubmit={handleSubmit(onCreatePost)} className='border-black border-3 text-center max-h-[200px]'>
        <div className='bg-slate-500 p-4 rounded-3xl'>
        <input className='border-black border-3 rounded-2xl p-3' placeholder='Title of your post...' {...register("title")}/>
        <br />
        <br />
        <br />
        <br />
        <textarea className='border-black border-3 rounded-2xl p-3' placeholder='Post...' {...register("description")}/>
        <p className='text-orange-500'>{errors.description?.message}</p>
        <br />
        <br />
        <button
         className='
               duration-200 text-[15px] text-white bg-slate-800 
              hover:bg-slate-600
               text-black font-bold py-3 px-3 rounded-full
               '>
         Submit Post!
        </button>
        </div>
    </form>
    
  )
}
export default Form;