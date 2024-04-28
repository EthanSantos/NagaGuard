import React, { useState } from 'react'
import axios from 'axios';

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDgo7iG_GdSy_a1Norjk2vAqobRvtcYL5g");

async function generateAI(description) {
    // For text-only input, use the gemini-pro model
    console.log("running")
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `what is the medical code for this report. use this format every time {"code-id": "description"}. ${description}`;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

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
        e.preventDefault();
        console.log(user);
        console.log(record);
        setError(""); // clear the error msg
    
        // Check if 'notes' field is empty
        if (record.notes.trim() === "") {
            console.error("Notes field is empty");
            return; // Do not proceed with the submission
        }
    
        try {
            const data = await generateAI(record.notes);
            console.log(data);
    
            // Parse the JSON data
            const parsedData = JSON.parse(data);
    
            // Format each medical code and description pair with a <br> tag for line breaks
            const dataFormatted = Object.entries(parsedData)
                    .map(([key, value]) => `\nMedical Code: ${key}\n Description: ${value}`);
                
            // Concatenate the formatted data with the existing notes
            const updatedRecord = { ...record };
            updatedRecord.notes += "\n" + dataFormatted;
    
            // Send the updated record to the server
            const response = await axios.post("http://localhost:5000/" + userType + "-add-record", updatedRecord);
            console.log(response.data);
            setError(response.data.message);
            loadRecords();
        } catch (error) {
            console.error("Error:", error);
        }
    
        setRecord(() => ({
            patientId: user.person_id,
            notes: "",
        }));
    };
    

    return (
        <div key={index}>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Height: {user.height}</p>
            <p>Weight: {user.weight}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Gender: {user.gender}</p>
            <form onSubmit={handleSubmit}>
                <textarea type="text" name="notes" value={record.notes} onChange={handleChange} className='inputPatient3'/>
                <button type="submit" className = "inputPatient2">Add record</button>
                <p>{error}</p>
            </form>
            {medicalRecords.map((str, index) => (
            <div key={index} style={{backgroundColor: '#97bacf', padding: '15px', borderRadius: '10px', marginBottom: '10px'}}>
                {str.split("\n").map((line, lineIndex) => (
                    <div>
                    <p key={lineIndex}>{line}</p><br/>
                    </div>
                ))}
    </div>
))}

        </div>
    )
}

export default PatientInfo
