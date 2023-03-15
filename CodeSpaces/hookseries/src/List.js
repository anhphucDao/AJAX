import React, {useEffect, useState} from "react";

export default function App({getItems}) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        setItem(getItems())
        console.log('Updating Items')
    }, [getItems])

    return item.map((value) => <li>{value}</li>)
}