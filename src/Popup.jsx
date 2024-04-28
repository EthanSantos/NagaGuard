import React from 'react'
import singDoc from './pics/singDoc.PNG';
import pRight from './pics/pRight.png';
import './style.css'

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
        <div class = "container d-flex flex-column align-items-center justify-content-center" style = {{marginTop : '12%'}}>
            <h3 className = "text-center" style = {{marginBottom: '2%', color: '#498B6D', fontSize: '35px'}}>Are you a</h3>
            <div className = "text-center mb-3">
                <div className = "button-container">
                    <button onClick={loadDoctor} style = {{buttonStyle, marginRight: '5px', border: 'none', borderRadius: '15px'}}>
                        <img src = {singDoc} alt = "Doctor Icon" className = "button-icon" style = {{width: '350px', height: 'auto'}}/>
                        <div className = "text-center" style = {{color: '#498B6D', fontSize: '30px'}}>
                            Doctor
                        </div>
                    </button>
                    <button onClick={loadPatient} style = {{buttonStyle, marginLeft: '5px', border: 'none', borderRadius: '15px'}}>
                        <img src = {pRight} alt = "Patient Icon" className = "button-icon" style = {{width: '350px', height: 'auto'}} />
                        <div className = "text-center" style = {{color: '#498B6D', fontSize: '30px'}}>
                            Patient
                        </div>
                    </button>
                </div>  
            </div>    
        </div>
    )
}

const buttonStyle = {
    backgroundColor: '#D9D9D9',
    color: '#498B6D',
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '16px',
}

export default Popup
