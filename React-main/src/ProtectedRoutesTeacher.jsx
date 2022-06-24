import React from "react";
import { useDB } from "./contexts/DBContext";
import { Outlet } from "react-router-dom";
import Login from "./components/login/Login";

const getUserType = ()=>{
    const {user} = useDB()
    if (user && user.userType) return user.userType
    return ""
}
 

const ProtectedRoutes = ()=>{
    const userType = getUserType();
    if (userType === "teacher") {return <Outlet />}
    else return <Login/>
}

export default ProtectedRoutes