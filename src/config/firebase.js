
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyAaJNCyS7ue9ZE1IMhi5P8v_vxHUpYXNmk",
  authDomain: "socialmedia-fa4f5.firebaseapp.com",
  projectId: "socialmedia-fa4f5",
  storageBucket: "socialmedia-fa4f5.appspot.com",
  messagingSenderId: "465697447492",
  appId: "1:465697447492:web:70b351b8e7473a4d0de611"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app)