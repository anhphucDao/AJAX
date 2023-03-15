import React, {useState, useCallback, useMemo} from "react";
import List from './List.js'

//recreate every single time render, created new function, although self dont change
//Callback: getItem only change when need
//differ useMemo (take function, return value of function); useCallback(take function return function)


export default function App() {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    // const getItem =  [number, number+1, number+2];
    const getItems = useCallback((incrementor) => {
        return (
            [number + incrementor, number+2*incrementor, number+3*incrementor]
        );
    }, [number])

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF': '#333'
    }

    return (
        <div style={theme}>
            <input
                type="number"
                value={number}
                onChange={
                    e => setNumber(parseInt(e.target.value))
                }/>
            <button onClick={() => setDark(preDark => !preDark)}>Toggle Theme</button>
            {/* <div>{getItem.map((value) => <li>{value}</li>)}</div> */}
            <List getItems = {getItems} />
        </div>
    );
}