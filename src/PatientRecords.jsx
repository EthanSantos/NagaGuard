import React, { useState, useEffect } from 'react'
import axios from 'axios';
import medRec from './pics/medRec.png';

const PatientRecords = ({ setDisplay, userId }) => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const loadRecords = async () => {
        console.log("loading records")
        try {
            console.log(userId)
            const response = await axios.get('http://localhost:5000/Doctor-get-records', {
                params: {
                    id: userId
                }
            });
            console.log(response.data);
            setMedicalRecords(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        loadRecords(); // Load records when userId changes
    }, [userId]);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <img src = {medRec} alt = 'medicalRecords' className="ing-fluid mb-3" style = {{maxWidth: '100%', height:'auto'}}/>
            {medicalRecords.length === 0 ? (
                <div className="medRec">
                    <p>No medical records found</p>
                </div>
            ) : (
                // <div className='pRecords'>
                //     medicalRecords.map((record, index) => (
                //     <p key={index}>{record}</p>
                // ))
                // </div>
                <div className='pRecords'>
                    {medicalRecords.map((record, index) => (
                        <div key={index} className="recordItem">
                            <p className="recordIndex">Record #{index+1}</p>
                            <p className="recordContent">{record}</p>
                        </div>
                    ))}
                </div>
                

            )}
            {/* <button onClick={goBack} className='button1'>Back</button> */}
            <button onClick={() => setDisplay("patient_page")} className='button1'>Back</button>
        </div>
    )
}

export default PatientRecords
