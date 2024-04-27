import React from 'react'

const Popup = ({ setDisplay, setUserType }) => {
    const loadDoctor = async (e) => {
        e.preventDefault()
        setUserType("Doctor")
        setDisplay("login")
    }

    const loadPatient = async (e) => {
        e.preventDefault()
        setUserType("Patient")
        setDisplay("login")
    }

    return (
        <div>
            <h3>Are you a doctor or a patient?</h3>
            <button onClick={loadDoctor}>Doctor</button>
            <button onClick={loadPatient}>Patient</button>
        </div>
    )
}

export default Popup
