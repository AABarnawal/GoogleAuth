import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css";
import axios from 'axios';

function Header() {
    const [userdata, setUserdata] = useState({});
    const getUser = async()=>{
        try {
            const response = await axios.get("http://localhost:8080/login/sucess", {withCredentials : true});
            console.log("response  : ",  response)
            setUserdata(response.data.user)
        } catch (error) {
         console.log(error)   
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    //logout function
    const logout = () => {
        window.open("http://localhost:8080/logout", "_self")
    }
  return (
    <div className='main' >
        <h2  className="left">
            logo
        </h2>
        <ul className="right" >
            {
                Object?.keys(userdata)?.length>0?(
                    <>
                        <li className="list">
                            <NavLink className="nav" to="/dashboard">DashBoard</NavLink>
                        </li>
                        <li className="list">
                            <h1 className="nav">{userdata?.displayName}</h1>
                        </li>
                        <li onClick={logout} className="list">
                            <NavLink className="nav" to="/">Logout</NavLink>
                        </li>
                        <li className="list">
                            <img className="image" src={userdata?.image}/>
                        </li>
                    </>
                ) :(
                    <>
                        <li className="list">
                            <NavLink className="nav" to="/">Home</NavLink>
                        </li>
                        <li className="list">
                            <NavLink className="nav" to="/login">Login</NavLink>
                        </li>
                    </>
                )
            }
        </ul>
    
    </div>
  )
}

export default Header