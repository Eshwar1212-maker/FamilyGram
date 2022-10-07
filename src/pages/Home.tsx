import {useState, useEffect} from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import {auth} from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import PostContent from '../components/PostContent'
import { motion } from 'framer-motion'

export interface Post{
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

const Home = () => {

  const [postsList, setPostsList] = useState<Post[] | null>(null)
  const postsRef = collection(db, "posts")
  const [user] = useAuthState(auth)
  const getPosts = async () => {
   const data = await getDocs(postsRef)
   setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[])
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>

    { user?
       <div className='text-center rounded-3xl p-4 m-auto h-screen'>
        {postsList?.map((post) => {
          return <PostContent post={post}/>
        })}
        </div>:
     <div className='text-center'>
      <p className='text-2xl w-screen m-auto text-white font-NavFont
       bg-[url("https://cdn.whitedust.net/wp-content/uploads/2020/10/Whitedust-1-1.jpg")] 
       w-full h-[740px] bg-cover bg-center p-24'>
      Welcome to Family Gram!! The best online website to connect with your friends and family to keep up with your
        latest events!
      </p>
      </div>
       }
       {!user && <h1 className='text-3xl text-white text-center font-semibold h-screen'>Join Today!</h1>}
      </div>
  )
}
export default Home