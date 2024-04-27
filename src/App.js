import React, { useState } from 'react'
import axios from 'axios';

function App() {

  const [info, setInfo] = useState({
    id: 5,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(info)

    setInfo((prev) => {
      return { ...prev, id: 6 }
    })

    try {
      const response = await axios.post('http://localhost:5000/stats-form', info);
      console.log(response.data); // Handle backend response
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <button type="submit" >Submit</button>
    </form>
  );
}

export default App;
