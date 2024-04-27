import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const LoginForm = ({ display, setDisplay, setUserId, userType }) => {
    const [errorMsg, setErrorMsg] = useState()


    const handleClick = () => {
        setDisplay(display === "login" ? "signup" : "login")
        setErrorMsg(null)
        console.log(display)
    }

    if (display === "login") {
        return (
            <div>
                <Login errorMsg={errorMsg} setErrorMsg={setErrorMsg} setDisplay={setDisplay} handleClick={handleClick} setUserId={setUserId} userType={userType} />
            </div>

        )
    }
    else{
        return (
            <div>
                <Signup errorMsg={errorMsg} setErrorMsg={setErrorMsg} setDisplay={setDisplay} handleClick={handleClick} setUserId={setUserId} userType={userType} />
            </div>
        )
    }
}

export default LoginForm
