import React, { useState } from 'react'
import axios from 'axios';

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDgo7iG_GdSy_a1Norjk2vAqobRvtcYL5g");

async function generateAI() {
    // For text-only input, use the gemini-pro model
    console.log("running")
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `what is the medical code for this report. use this format. use the format {"code-id": "description"}. This patient has a paronychia of the left index figure. After the area was anesthetized, I then prepped this area with Betadine solution. Then was prepped in a sterile fashion. Utilizing iris scissors.I then opened up the area of pus and tried to express any pus that was in that area. There is no evidence of felon, septic arthritis, or obvious retained foreign body. I then cleaned out the area as best I could, and then a dressing was placed. The patient tolerated the procedure well. Patient was given instructions to keep the area clean, and to continue a Neosporin and Band-Aid for couple days and to return immediately if the condition worsens as we discussed`;
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
        e.preventDefault()
        console.log(user)
        console.log(record)
        setError("") // clear the error msg

        // Check if 'notes' field is empty
        if (record.notes.trim() === '') {
            console.error('Notes field is empty');
            return; // Do not proceed with the submission
        }

        const data = await generateAI()
        console.log(data)

        setRecord(prevRecord => ({
            ...prevRecord,
            notes: prevRecord.notes + data
        }));

        console.log(record.notes)

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
