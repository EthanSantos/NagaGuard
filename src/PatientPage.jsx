import React from 'react'
import menu from './pics/menu.png';

const PatientPage = ( {setDisplay} ) => {
  return (
    <div className='container d-flex flex-column align-items-center' style={{marginTop: '10%'}} >
      <div className='title d-flex justify-content-center align-items-center'>
        <img src = {menu} alt = "menu" className="ing-fluid" style = {{maxWidth: '80%', height:'auto'}}/>
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
