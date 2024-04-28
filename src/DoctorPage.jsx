import React, { useState } from 'react'
import axios from 'axios';
import PatientInfo from './PatientInfo';

const DoctorPage = ({ userType }) => {

    const [patientId, setPatientId] = useState();
    const [patientInfo, setPatientInfo] = useState([]); // track the patient's information
    const [errorMsg, setErrorMsg] = useState();
    const [medicalRecords, setMedicalRecords] = useState([]);

    const handleChange = (e) => {
        setPatientId(e.target.value)
    }

    
    const loadRecords = async () => {
        console.log("loading records")
        try {
            const response = await axios.get('http://localhost:5000/' + userType + '-get-records', {
                params: {
                    id: patientId
                }
            });
            console.log(response.data);
            setMedicalRecords(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(patientId)

        setErrorMsg("")

        try {
            const response = await axios.get('http://localhost:5000/' + userType + '-get-stats', {
                params: {
                    id: patientId  // Pass the number (1 in this case) as a query parameter
                }
            });
            console.log(response.data);
            setPatientInfo(response.data)
            if (response.data.length === 0) {
                setErrorMsg("Patient ID does not exist")
            }
            else{
                loadRecords()
            }


        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Patient Id: </h3> <input type="text" name="patient_id" onChange={handleChange} />
                <button type="submit">Lookup</button>
            </form>
            <div>
                <h1>Patient Info</h1>
                <p>{errorMsg}</p>
                {patientInfo.map((user, index) => (
                    <PatientInfo user={user} index={index} userType = {userType} loadRecords={loadRecords} medicalRecords={medicalRecords}/>
                ))}
            </div>
        </div>
    )
}

export default DoctorPage
