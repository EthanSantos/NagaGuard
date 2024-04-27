import React, { useState } from 'react'

import axios from 'axios';

const Signup = ({ errorMsg, setErrorMsg, setDisplay, handleClick, setUserId, userType }) => {

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
            const response = await axios.post('http://localhost:5000/signup-form', info);
            console.log(response.data); // Handle backend response
            setErrorMsg(response.data.message)

            if (response.data.message === "Created account.") {
                console.log("Account created")
                setDisplay("profile")
                setUserId(response.data.id)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const goBack = async (e) => {
        setDisplay("popup")
    }


    if (userType === "Doctor") {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>Doctor Signup</h3>
                    <h3>Medical ID: </h3> <input type="text" name="medicalID" onChange={handleChange} />
                    <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                    <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                    <button type="submit">Signup</button>
                    <p>{errorMsg}</p>
                </form>
                <p>Already have an account? <a href="/#" onClick={handleClick}>Login</a></p>
                <button onClick={goBack}>Back</button>
            </div >
        )
    }
    else if (userType === "Patient") {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>Patient Signup</h3>
                    <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                    <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                    <button type="submit">Signup</button>
                    <p>{errorMsg}</p>
                </form>
                <p>Already have an account? <a href="/#" onClick={handleClick}>Login</a></p>
                <button onClick={goBack}>Back</button>
            </div >
        )

    }
}

export default Signup
