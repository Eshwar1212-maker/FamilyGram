import React, { useEffect, useState } from 'react'
import {Post as Ipost} from "../pages/Home"
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, db} from "../config/firebase" 
import {BiTrash} from 'react-icons/bi'
import {collection, addDoc, query, where, getDocs, deleteDoc, doc} from "firebase/firestore"
import {AiFillLike} from 'react-icons/ai'
import {BsFillHandThumbsDownFill} from 'react-icons/bs'
import { Post as IPost } from "../pages/Home";



interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

const PostContent = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const postsRef = collection(db, "posts");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);


  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className='
    text-center bg-slate-800 text-white
    p-2 m-auto rounded-3xl sm:w-[400px] lg:w-[670px]
    '>
        <h3 className='font-bold text-sm text-center'>{post.title}</h3>
        <br />
        <div>
          <p className=''>{post.description}</p>
        </div>
        <div className=''>
          <br />
        <img className='rounded-xl mx-auto' src={auth.currentUser?.photoURL || " "} width="40" height="40"/>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <BsFillHandThumbsDownFill className='text-xl duration-500 hover:text-yellow-800 hover:text-xl'/> : <AiFillLike className='text-xl duration-500 hover:text-yellow-500 hover:text-xl'/>}{" "}
        </button>
        {<p className='font-bold text-xs text-blue-300'>{likes?.length} Likes</p>}
        </div>
        <br />
    </div>
  )
}
export default PostContent;