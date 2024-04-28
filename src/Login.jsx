import React, { useState } from 'react'

import axios from 'axios';
import welcome from './pics/welcome.PNG';

const Login = ({ errorMsg, setErrorMsg, setDisplay, handleClick, setUserId, userType }) => {

    const [info, setInfo] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)

        try {
            const response = await axios.post('http://localhost:5000/' + userType + '-login', info);
            console.log(response.data); // Handle backend response
            setErrorMsg(response.data.message)

            if (response.data.message === "Login successful.") {
                console.log("login successful")
                setUserId(response.data.id)
                if (userType === "Doctor") {
                    setDisplay("doctor_page")
                }
                else {
                    setDisplay("profile")
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const goBack = async (e) => {
        setDisplay("popup")
    }

    return (
        <div className = "container">
            <div className = "row justify-content-center" style={{marginTop: '8%'}}>
                <div className = "col-md-6">
                    <img src= {welcome} alt = "Logo" className="ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}></img>
                </div>
            </div>

            <div className = "row justify-content-center"> 
                <div className = "col-md-6 text-center"> 
                    <form onSubmit={handleSubmit}>
                        <h3>{userType} Login</h3>
                        <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                        <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                        <div className = "logInBut">
                            <button type="submit" className='button1'>Login</button>
                        </div>
                        <p>{errorMsg}</p>
                    </form>
                    <p>Don't have an account? <a href="/#" onClick={handleClick} className='signUp'>Sign up</a></p>
                    <button onClick={goBack} className='button1'>Back</button>
                </div>
            </div>
        </div >
    )
}

export default Login
