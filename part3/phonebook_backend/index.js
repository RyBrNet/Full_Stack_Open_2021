const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

var morgan = require('morgan')
morgan.token('phone_number', function getPhoneNumber(request) {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :phone_number')) //

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to the online Phonebook</h1>')
})

app.get('/info', (request, response) => {
  const count = phonebook.length
  console.log(count);
  const info = `<p>Phonebook has info for ${count} people</p>` + `<p>${new Date()}</p>`
  response.send(info)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * (100000 - 1) + 1);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if (phonebook.find((element) => element.name === body.name) )
  return response.status(409).json({ 
    error: 'name must be unique' 
  })

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})