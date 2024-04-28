import React, { useState } from 'react'
import axios from 'axios';

const PatientInfo = ({ user, index, userType, loadRecords, medicalRecords }) => {

    const [record, setRecord] = useState({
        patientId: user.person_id,
        notes: "",
    })

    const [error, setError] = useState();

    const handleChange = (e) => {
        setRecord(() => ({
            patientId: user.person_id,
            notes: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user)
        console.log(record)
        setError("") // clear the error msg

        // Check if 'notes' field is empty
        if (record.notes.trim() === '') {
            console.error('Notes field is empty');
            return; // Do not proceed with the submission
        }

        try {
            const response = await axios.post('http://localhost:5000/' + userType + '-add-record', record);
            console.log(response.data);
            setError(response.data.message)
            loadRecords()
        } catch (error) {
            console.error('Error:', error);
        }
        setRecord(() => ({
            patientId: user.person_id,
            notes: '',
        }));
    }

    return (
        <div key={index}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Height: {user.height}</p>
            <p>Weight: {user.weight}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Gender: {user.gender}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="notes" value={record.notes} onChange={handleChange} />
                <button type="submit">Add record</button>
                <p>{error}</p>
            </form>
            {medicalRecords.map((str, index) => (
                <p key={index}>{str}</p>
            ))}
        </div>
    )
}

export default PatientInfo
