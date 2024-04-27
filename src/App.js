import React, {useState} from 'react'
import LoginForm from './LoginForm';

function App() {

  const [display, setDisplay] = useState("login") // state to track what to display

  return (
    <div>
      <LoginForm display={display} setDisplay={setDisplay}/>
    </div>
  );
}

export default App;
