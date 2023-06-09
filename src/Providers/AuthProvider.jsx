import React, { createContext, useEffect, useState } from 'react'
import app from '../Firebase/firebase.config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null)
const auth = getAuth(app)


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser =(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }



  const logOut = () => {
      setLoading(true);
      return signOut(auth);
  }

  const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
      });
  }

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () =>{
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);

          if(currentUser){
            axios.post('http://localhost:5000/jwt', {email: currentUser.email})
            .then(data => {
                localStorage.setItem("access-token-bistro", data.data.token)

                 
            setLoading(false);
            })
         
          }else{
            localStorage.removeItem("access-token-bistro")
          }

          
      });
      return () => {
          return unsubscribe();
      }
  }, [])

  const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      logOut,
      updateUserProfile,
      signInWithGoogle
  }

    
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider