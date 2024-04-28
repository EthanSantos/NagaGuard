import React, { useState } from 'react'

import axios from 'axios';
import welcomeback from './pics/welcomeBack.PNG';

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
            const response = await axios.post('http://localhost:5000/' + userType + '-signup', info);
            console.log(response.data); // Handle backend response
            setErrorMsg(response.data.message)

            if (response.data.message === "Created account.") {
                console.log("Account created")
                if (userType === "Doctor"){
                    setDisplay("doctor_page")
                }
                else{
                    setDisplay("profile")
                }
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
            <div className = "container">
                <div className = "row justify-content-center" style = {{marginTop: '8%'}}>
                    <div className = "col-md-6">
                        <img src = {welcomeback} alt = "logo" className = "ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}/>
                    </div>
                </div>

                <div className = "row justify-content-center">
                    <div className = "col-md-6 text-center">
                        <form onSubmit={handleSubmit}>
                            <h3>{userType} Sign Up</h3>
                            <h3>Medical ID: </h3> <input type="text" name="medicalID" onChange={handleChange} />
                            <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                            <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                            
                            <div className = "logInBut">
                                <button type="submit" className='button1'>Signup</button>
                            </div>
                            
                            <p>{errorMsg}</p>
                        </form>
                        <p>Already have an account? <a href="/#" onClick={handleClick} className='logIn'>Login</a></p>
                        <button onClick={goBack} className='button1'>Back</button>
                    </div>
                </div>
            </div >
        )
    }
    else if (userType === "Patient") {
        return (
            <div className = "container">
                <div className = "row justify-content-center" style = {{marginTop: '8%'}}>
                    <div className = "col-md-6">
                        <img src = {welcomeback} alt = "logo" className = "ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}/>
                    </div>
                </div>

                <div className = "row justify-content-center">
                    <div className = "col-md-6 text-center">
                        <form onSubmit={handleSubmit}>
                            <h3>{userType} Sign Up</h3>
                            <h3>Username: </h3> <input type="text" name="username" onChange={handleChange} />
                            <h3>Password: </h3> <input type="password" name="password" onChange={handleChange} />
                            <div className = "logInBut">
                                <button type="submit" className='button1'>Signup</button>
                            </div>
                            <p>{errorMsg}</p>
                        </form>
                    <p>Already have an account? <a href="/#" onClick={handleClick} className='logIn'>Login</a></p>
                    <button onClick={goBack} className='button1'>Back</button>
                    </div>
                </div >
            </div>
            
        )

    }
}

export default Signup
