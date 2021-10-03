const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :dataBody'))
morgan.token('dataBody', function (req, res) { return JSON.stringify(req.body) })

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get('/info', (request, response) => {
  response.send(`There are currently ${persons.length} people saved in the phonebook </br> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.use(express.json())

const generateId = () => {
  const id = Math.floor(Math.random() * 100000)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})