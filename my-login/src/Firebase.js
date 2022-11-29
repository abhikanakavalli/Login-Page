// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, 
  createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM0EI4gO1vH0Pzj9EoHOTfbi7m-0Yih4U",
  authDomain: "logform1.firebaseapp.com",
  projectId: "logform1",
  storageBucket: "logform1.appspot.com",
  messagingSenderId: "1036660669425",
  appId: "1:1036660669425:web:6a49b3a2f6d8074ef4a250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result)=>{
    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePic", profilePic);
  }).catch((error)=>{
    console.log(error)
  })
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword( auth,email, password);
}

export function logOut() {
  return signOut(auth);
}

// custom hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, user => setCurrentUser(user));
  },[])

  return currentUser;
}