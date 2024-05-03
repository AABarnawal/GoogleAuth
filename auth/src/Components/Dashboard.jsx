import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const getUser = async()=>{
    try {
        const response = await axios.get("http://localhost:8080/login/sucess", {withCredentials : true});
        console.log("response  : ",  response)
    } catch (error) {
     navigate("*")  
    }
}
useEffect(()=>{
    getUser()
},[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard