import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const DB_ADDR = 'http://localhost:3001/contacts'

function PhoneBook(props) {
  const [editableName, setEditableName] = useState('')
  const [editableNumber, setEditableNumber] = useState('')
  const [isImportant, setAsImportant] = useState(true)
  const addContact = props.addContactFn;
  const addContactCb = (event) => {
    event.preventDefault()
    addContact(editableName, editableNumber, isImportant)
  }
  return (
    <div className="phonebook-section">
      <h1>Phonebook</h1>
      <form onSubmit={addContactCb}>
        name: <input value={editableName} onChange={(event) => {
                setEditableName(event.target.value)
              }} />
        <br />
        number: <input value={editableNumber} onChange={(event) => {
                  setEditableNumber(event.target.value)
                }} />
        <br />
        important: <input type="checkbox" checked={isImportant} onChange={(event) => {
                      setAsImportant(event.target.checked)
                   }} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function NumberItem(props) {
    const contact_item = props.contact_item
    const removeContact = props.removeContactFn
    const removeContactCb = (event) => {
      event.preventDefault()
      removeContact(contact_item.id)
    }
    return (
      <form onSubmit={removeContactCb}>
        <li key={contact_item.id} className="number-item">
            Id: {contact_item.id}
            <br />
            Name: {contact_item.name}
            <br />
            Number: {contact_item.number}
            <br />
            Important: {contact_item.important.toString()}
            <br />
            <button type="submit">Delete</button>
        </li>
      </form>
      )
}

function Numbers(props) {
  const [willShowImportant, setWillShowImportant] = useState(false)
  const list = (
    () => (
      /* It would be more appropriate to use the array filter method, but map also works. We just have to set up an extra guard for null entry */
      willShowImportant ? props.list.map(item => (item.important === true ? item : null)) : props.list
    )
  )()
  return (
    <div className="number-section">
      <h1>Numbers</h1>
      <input type="checkbox" checked={willShowImportant} onChange={ event => {
        setWillShowImportant(event.target.checked)
      }}/> Show only important contacts <br />
      <ul className="number-list">
      {
        list?.map( contact_item => {
          if (!contact_item) return null
          else return (<NumberItem contact_item={contact_item} removeContactFn={props.removeContactFn}/>)
        })
      }
      </ul>
    </div>
  );
}

function App() {
  const [contactList, changeContactList] = useState([]);
  useEffect(() => {
    axios.get(DB_ADDR)
         .then(response => {
          changeContactList(response.data)
         })
  }, [])
  // empty array: only at mounting
  const addContact = (name, number, isImportant) => {
    let applicantContact = {
        'id': String(Math.ceil(Math.random()*10000000)),
        'name': name,
        'number': number,
        'important': isImportant
      }
    try {
      contactList.forEach((item, idx) => {
          if (item.number === applicantContact.number) throw new Error("Number already exists!")
      })
      changeContactList([...contactList, applicantContact])
      axios.post(DB_ADDR, applicantContact)
    } catch (Exception) {
      console.log(Exception.message)
    }
  }
  const removeContact = (id) => {
    let newContactList = contactList.filter( item => (item.id !== id) )
    changeContactList(newContactList)
    axios.delete(DB_ADDR + '/' + id)
  }
  return (
    <div className="app">
      <PhoneBook addContactFn={addContact} />
      <Numbers list={contactList} removeContactFn={removeContact} />
    </div>
  );
}

export default App;
