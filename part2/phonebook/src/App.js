import './App.css';
import {useState} from 'react'

function PhoneBook(props) {
  const addContact = props.addContactFn;
  const [editableName, setEditableName] = useState('')
  const [editableNumber, setEditableNumber] = useState('')
  const [isImportant, setAsImportant] = useState(true)
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
        list?.map( (contact_item) => {
          if (!contact_item) return null
          return (
          <li key={contact_item.id} className="number-item">
            <div>
              Id: {contact_item.id}
              <br />
              Name: {contact_item.name}
              <br />
              Number: {contact_item.number}
              <br />
              Important: {contact_item.important.toString()}
            </div>
          </li>
          )
        }
        )
      }
      </ul>
    </div>
  );
}

function App() {
  const [contactList, changeContactList] = useState([]);
  const addContact = (name, number, isImportant) => {
    let applicantContact = {
        'id': contactList.length + 1,
        'name': name,
        'number': number,
        'important': isImportant
      }
    try {
      contactList.forEach((item, idx) => {
          if (item.number === applicantContact.number) throw new Error("Number already exists!")
      })
      changeContactList([...contactList, applicantContact])
    } catch (Exception) {
      console.log(Exception.message)
    }
  }
  return (
    <div className="app">
      <PhoneBook addContactFn={addContact}/>
      <Numbers list={contactList}/>
    </div>
  );
}

export default App;
