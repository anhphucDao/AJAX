import React, {useEffect, useState} from 'react'

export default function App() {
    const [windowWidth, setWindoWwidth] = useState(window.innerWidth)

    const handleResize = ()=> {
        setWindoWwidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize) //handleing resize on mouse
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div>{windowWidth}</div>
    );
}