import React, {useState, useMemo, useEffect} from "react";

//if number not change => dont need to re-reder

export default function App() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);
    const doubleNum = useMemo(() => {
        return slowFunction(number) // saving previous value, should use in slow function
    }, [number]) //us
    //compare 2 
    const themeStyle = useMemo(() => {
        return {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black'
        };
    }, [dark]);

    useEffect(() => {
        console.log("theme changed")
    }, [themeStyle])

    return (
        <div>
            <input 
                type="number" 
                value={number} 
                onChange = {
                    e => setNumber(parseInt(e.target.value))
                } />
            <button onClick={() => setDark(prevDark => ! prevDark)}>Change Theme</button>
            <div style={themeStyle}>{doubleNum}</div>

        </div>
    );
}


function slowFunction(num) {
    console.log('Calling SLow Function')
    for (let i = 0; i <= 1e9; ++i) {}
    return num*2;
}