import React, { useContext, useState } from "react"

import {authF} from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const auth = authF
    const [currentUser, setCurrentUser] = useState(undefined)


    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    

    
    


    const value = {
        currentUser,
        setCurrentUser,
        login,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}