import React from 'react'

const PatientPage = ( {setDisplay} ) => {
  return (
    <div className='container d-flex flex-column align-items-center' style={{marginTop: '10%'}} >
      <div className='title'>
        <h1> Menu </h1>
      </div>
      <div className='pBut'>
        <button onClick={() => setDisplay("profile")} className='navBut'>Edit Profile</button>
      </div>
      <div className='pBut'>
        <button onClick={() => setDisplay("records")} className='navBut'>Load Records</button>
      </div>
      <div className='pBut'>
        <button onClick={() => setDisplay("login")} className='navBut'>Logout</button>
      </div>
    </div>
  )
}

export default PatientPage
