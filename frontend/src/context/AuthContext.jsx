import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,onAuthStateChanged} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState,useEffect} from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();
export const useAuth = ()=>{
    return useContext(AuthContext);
}

const googleprovider = new GoogleAuthProvider()

//auth provider
export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async(email,password)=>{
 return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = async(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signGoogle = async()=>{
        return await signInWithPopup(auth,googleprovider)
    }
    const logout = async()=>{
        return auth.signOut(auth);
    }
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])
    const value = {
currentUser,
registerUser,
loginUser,
signGoogle,logout

    }
    return(
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}


