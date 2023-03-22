const pkgName = require('./package.json').name
const dotenv = require('dotenv')
dotenv.config()
const PASSWORD = String(process.env.MONGO_PASS)
const MONGO_URI = String(process.env.MONGO_URI).replace("{{password}}", PASSWORD)
const PORT = Number(process.env.PORT) || 3001
if (!PASSWORD || !MONGO_URI) {
  console.error(`[${pkgName}:ERROR] Did not provide enough required environment variables and secrets!`)
  process.exit(1)
}

const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

// Make sure this is the last middleware
const errorHandler = (error, request, response, next) => {
  console.error(`[${pkgName}:ERROR] ${error.message}`)
  next(error)
}
app.use(errorHandler)

const mongoose = require('mongoose')
const {Contact, _generateId} = require('./models').Contact

try {
  mongoose.set('strictQuery', false)
  // Will this every throw an error?
  mongoose.connect(MONGO_URI)
} catch (err) {
  console.log(err)
}

process.on('exit', () => {
  mongoose.connection.close()
})

app.get('/contacts', (request, response) => {
  Contact.find({}).then( result => {
    response.json(result)
  })
})

app.delete('/contacts/:id', async (request, response) => {
  const id = String(request.params.id)
  const doc = await Contact.findByIdAndDelete(id)
  if (doc) {
    return response.status(200).json({success_message: 'succesfully deleted'})
  }
  else return response.status(400).json({error: 'couldn\'t delete'})
})

app.post('/contacts', (request, response) => {
  const body = request.body
  if ( body == undefined || (body.name == undefined) || (body.number == undefined) || (body.important == undefined) ) {
    return response.status(400).json({error: 'data is malformed'})
  }
  const name = String(body.name)
  const number = String(body.number)
  const important = Boolean(body.important)
  Contact.find({number: number}).then( result => {
    console.info('[INFO] Array length of contacts is ', result.length)
    if (result.length == 0) {
      const newContact = new Contact({
        name: name,
        number: number,
        important: important
      })
      newContact.save()
      return response.status(200).json({new_entry: newContact})
    }
    else {
      return response.status(400).json({error: 'entry already exists'})
    }
  }).catch( error => {
    console.log(error)
    response.status(500).end()
  })
})

app.listen(PORT, () => {
  console.log(`Server has been created on ${PORT}`)
})