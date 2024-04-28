import React from 'react'

const PatientPage = ( {setDisplay} ) => {
  return (
    <div>
      <button onClick={() => setDisplay("profile")}>Edit Profile</button>
      <button onClick={() => setDisplay("records")}>Load Records</button>
      <button onClick={() => setDisplay("login")}>Logout</button>
    </div>
  )
}

export default PatientPage
