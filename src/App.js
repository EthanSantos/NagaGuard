import React, { useState } from 'react'
import LoginForm from './LoginForm';
import Profile from './Profile';
import Home from './Home';
import Popup from './Popup';
import DoctorPage from './DoctorPage';
import PatientPage from './PatientPage';
import PatientRecords from './PatientRecords';

function App() {  
  const [display, setDisplay] = useState("home"); // state to track what to display
  const [userId, setUserId] = useState(); // track the user id
  const [userType, setUserType] = useState("patient"); // track the user type

  if (display === "home") {
    return (
      <Home setDisplay={setDisplay} />
    )
  }
  else if (display === "popup") {
    return (
      <Popup setDisplay={setDisplay} setUserType={setUserType} />
    )
  }
  else if (display === "patient_page") {
    return (
      <div>
        <PatientPage setDisplay={setDisplay} userId={userId} />
      </div>
    )
  }
  else if (display === "profile") {
    return (
      <div>
        <Profile userId={userId} userType={userType} setDisplay={setDisplay} />
      </div>
    )
  }
  else if (display === "doctor_page") {
    return (
      <div>
        <DoctorPage userType={userType} />
        <div style={{textAlign:'center'}}>
        <button onClick={() => setDisplay("login")} className ='button1'>Logout</button>
        </div>
      </div>
    )
  }
  else if (display === "records") {
    return (
      <div>
        <PatientRecords setDisplay={setDisplay} userId={userId}/>
      </div>
    )
  }
  else {
    // show the login form (not logged in)
    console.log("login!")
    return (
      <div>
        <LoginForm display={display} setDisplay={setDisplay} setUserId={setUserId} userType={userType} />
      </div>
    );
  }
}

export default App;
