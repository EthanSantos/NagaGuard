import React, { useState } from 'react'

import axios from 'axios';

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
        <div>
            <form onSubmit={handleSubmit}>
                <h3>{userType} Login</h3>
                <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                <button type="submit">Login</button>
                <p>{errorMsg}</p>
            </form>
            <p>Don't have an account? <a href="/#" onClick={handleClick}>Sign up</a></p>
            <button onClick={goBack}>Back</button>
        </div >
    )
}

export default Login
