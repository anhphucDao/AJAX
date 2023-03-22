const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = mongoose.model('TestContact', contactSchema)

function generateId() {
  let id = Math.ceil(Math.random()*1000000000)
  return id
}

module.exports = {
  Contact: Contact,
  _generateId: generateId
}