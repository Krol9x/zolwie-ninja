import "./login.css"
import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useDB } from "../../contexts/DBContext"
import { useNavigate } from "react-router-dom"


export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser, setCurrentUser } = useAuth()
  const { user ,updateUser } = useDB()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if(currentUser===undefined) return
      updateUser()
    
  },[currentUser])

  const navigate = useNavigate()

  useEffect(()=>{
    if(user===undefined) return
    navigate("/"+user.userType)
  },[user])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      let a = await login(emailRef.current.value, passwordRef.current.value)
      let userToStore = {
        uid: a.user.uid,
        email: a.user.email,
      }
      setCurrentUser(userToStore)


    } catch (error) {
      console.log(error)
      setError("Nieprawidłowy login lub hasło")
    }
    setLoading(false)
  }

  return (

    <div className="login-div" >
      <form>
        <input ref={emailRef} type={"text"} className="pole" placeholder="Login" required></input> <br />
        <input ref={passwordRef} type={"password"} className="pole" placeholder="Hasło" required></input> <br />
        <button type="submit" className="btn" disabled={loading} onClick={handleSubmit}>Zaloguj się</button>
        {error}
      </form>

    </div>

  )
}

