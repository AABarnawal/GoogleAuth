import React from 'react'
import '../App.css'

function Login() {
  const loginwithgoogle=()=>{
    window.open("http://localhost:8080/auth/google/callback", "_self")
  }
  return (
    <div className='App-header' >
        <button
          style={{width:"300px", justifyContent : 'space-evenly', display:'flex'}}
          onClick={loginwithgoogle}
        >
        <img 
            className="image" 
            src="https://1000logos.net/wp-content/uploads/2016/11/Google-Symbol.png"
        />
            <h2>Sign in with google</h2>
        </button>
    </div>
  )
}

export default Login