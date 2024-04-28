import React, { useState } from 'react'
import axios from 'axios';


const Profile = ({ userId, userType, setDisplay }) => {

    const [info, setInfo] = useState({
        id: userId,
        firstName: "",
        lastName: "",
        height: "",
        weight: "",
        gender: "",
        dob: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)

        try {
            const response = await axios.post('http://localhost:5000/' + userType + '-profile', info);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        setDisplay("patient_page")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => {
            return { ...prev, [name]: value }
        })
    }

    return (
        <div>
            <div className = "container d-flex flex-column align-items-center justify-content-center" style = {{marginTop:'5%', textAlign: 'left'}}>
                <div className = "content"> 
                    <div className = "title" style = {{textAlign: 'center'}}>
                        <h3> my Profile </h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h4>First Name: </h4> <input type="text" name="firstName" onChange={handleChange} className = "profileInp"/>
                        <h4>Last Name: </h4> <input type="text" name="lastName" onChange={handleChange} className = "profileInp"/>
                        <h4>Height: </h4> <input type="text" name="height" onChange={handleChange} className = "profileInp"/>
                        <h4>Weight: </h4> <input type="text" name="weight" onChange={handleChange} className = "profileInp"/>
                        <h4>Gender: </h4> <input type="text" name="gender" onChange={handleChange} className = "profileInp"/>
                        <h4>Date of Birth: </h4> <input type="date" name="dob" onChange={handleChange} className = "profileInp"/>
                        <div className = "submitBut">
                            <button type="submit" className="subBut">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
