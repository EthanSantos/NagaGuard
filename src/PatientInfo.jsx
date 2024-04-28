import React from 'react'

const PatientInfo = ({ user, index }) => {
    return (
        <div key={index}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Height: {user.height}</p>
            <p>Weight: {user.weight}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Gender: {user.gender}</p>
        </div>
    )
}

export default PatientInfo
