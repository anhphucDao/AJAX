const express = require('express')
const app = express()
app.use(express.json())

let json_test = [
  {
    id: 1,
    name: "Fulton",
    number: "13812711",
    important: true
  },
  {
    id: 2,
    name: "Johnny",
    number: "19912811",
    important: false
  }
]

const dbEntryPrototype = {
    id: -1,
    name: "",
    number: "",
    important: false,
    generateId: function() {
      this.id = Math.ceil(Math.random()*1000000000);
    }
}

app.get('/', (request, response) => {
  response.send("Welcome to the db server")
})

app.get('/contacts', (request, response) => {
  response.json(json_test)
})

app.get('/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  const entry = json_test.find(item => item.id === id)
  if (!entry) {
    response.send("Couldn't find entry")
    return
  }
  response.json(entry)
})

app.delete('/contacts/:id', (request, response) => {
  const id = Number(request.params.id)
  json_test = json_test.filter( item => item.id !== id )
  response.json(json_test)
})

app.post('/contacts', (request, response) => {
  const body = request.body
  if (!body || !(body.name) || !(body.number) || !(body.important) ) return response.status(400).json({exception: 'no body content'})
  let newEntry = Object.create(dbEntryPrototype)
  newEntry.generateId()
  newEntry.name = String(body.name)
  newEntry.number = String(body.number)
  newEntry.important = Boolean(body.important)
  json_test.forEach( item => {
    if (item.number == newEntry.number) return response.status(400).json({exception: 'duplicated item'})
  })
  json_test = json_test.concat(newEntry)
  response.status(200).json({message: 'Successfully added new entry'})
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server has been created on ${PORT}`)
})