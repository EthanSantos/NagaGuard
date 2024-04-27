import React from 'react'

const Home = ({ setDisplay }) => {

    const onClick = async (e) => {
        e.preventDefault()
        setDisplay("popup")
    }

    return (
        <div>
            <button type="submit" onClick={onClick}>Click here to start</button>
        </div>
    )
}

export default Home
