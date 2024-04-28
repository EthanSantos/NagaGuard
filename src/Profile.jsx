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
            <form onSubmit={handleSubmit}>
                <h3>First Name: </h3> <input type="text" name="firstName" onChange={handleChange} />
                <h3>Last Name: </h3> <input type="text" name="lastName" onChange={handleChange} />
                <h3>Height: </h3> <input type="text" name="height" onChange={handleChange} />
                <h3>Weight: </h3> <input type="text" name="weight" onChange={handleChange} />
                <h3>Gender: </h3> <input type="text" name="gender" onChange={handleChange} />
                <h3>Date of Birth: </h3> <input type="date" name="dob" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Profile
