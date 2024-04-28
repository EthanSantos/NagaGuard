import React from 'react'
import './style.css'

import finalLogo from './pics/finalLogo.png';
import trademark from './pics/trademark.png';

const Home = ({ setDisplay }) => {

    const onClick = async (e) => {
        e.preventDefault()
        setDisplay("popup")
    }

    return (
        <div className="container">
            <div className = "row justify-content-center" style={{marginTop: '8%'}}>
                <div className = "col-md-6">
                    <img src= {finalLogo} alt = "Logo" className="ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}></img>
                </div>
            </div>

            <div className = "row justify-content-center">
                <div className = "col-md-6">
                    <img src= {trademark} alt = "Logo" className="img-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}></img>
                </div>
            </div>

            <div className = "row justify-content-center"> 
                <div className = "col-md-6 text-center"> 
                    <button type = "submit" onClick={onClick} className="button">Click here to start</button>
                </div>
            </div>
                
        </div>
    )
}

export default Home
