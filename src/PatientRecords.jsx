import React, { useState, useEffect } from 'react'
import axios from 'axios';

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
        <div>
            {medicalRecords.length === 0 ? (
                <p>No medical records found</p>
            ) : (
                medicalRecords.map((record, index) => (
                    <p key={index}>{record}</p>
                ))
            )}
            <button onClick={() => setDisplay("patient_page")}>Back</button>
        </div>
    )
}

export default PatientRecords
