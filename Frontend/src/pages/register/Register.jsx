import React, { useRef } from 'react'
import "./Register.css"
import axios from 'axios';
import {useNavigate} from "react-router"

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords doesnot match")
    }else{
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      }
      try {
        await axios.post("/api/auth/register", user)
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>Taku</h3>
                <span className="logindesc">
                  Connect with people around the globe on Taku
                </span>
            </div>
            <div className="loginRight">
              <form className="loginBox" onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' required ref={username} className="loginInput" />
                <input type="email" placeholder='Email' required ref={email} className="loginInput" minLength={6} />
                <input type="Password" placeholder='Password' required ref={password} className="loginInput" />
                <input type="password" placeholder='Password Again' required ref={passwordAgain} className="loginInput" />
                <button className="loginButton" type='submit'>Sigh Up</button>
                <button className="loginRegisterButton">Already Registered? Log In</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Register
