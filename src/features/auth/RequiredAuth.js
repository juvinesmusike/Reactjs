import { useLocation , Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import React, { Component }  from 'react';

const RequireAuth = () => {
    const token = localStorage.getItem("user")
    const location = useLocation()
    // console.log(token);
    return (
        token 
        ? <Outlet/>
        : <Navigate to="/login" />
    )
}
export default RequireAuth