const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please prvide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const pass = process.argv[2]

const url = `mongodb+srv://benogre:${pass}@cluster0.dcxiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        mongoose.connection.close()
    })
    console.log(`added ${person.name} number ${person.number} to the phonebook`)
} else {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}