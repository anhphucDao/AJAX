import React, {useEffect, useState} from 'react'

function App() {
    const [resourceType, setResourceType] = useState('posts')
    const [item, setItem] = useState([])
    useEffect(() => {
        // fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        //     .then(Response => Response.json())
        //     .then(json => setItem(json))
        console.log('resourse changed') //remember this

        return () => {
            console.log('return from resourse change') //cleanup whatever we did
        }
    }, [resourceType])

    return (
        <>
        <div>
            <button onClick={() => setResourceType('posts')}>Posts</button>
            <button onClick={() => setResourceType('users')}>Users</button>
            <button onClick={() => setResourceType('comments')}>Comments</button>
        </div>
        {resourceType}
        {item.map(item => {
            return <pre>{JSON.stringify(item)}</pre>
        })}
        </>
    );
}

export default App;