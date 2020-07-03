import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './App.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const showNotification = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) {
      if(!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (existingPerson) {
      personService
        .update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            showNotification(
              `Updated ${returnedPerson.name}`
            )
          })
          .catch(error => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`, 'error'
            )
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
    }
    else {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(
            `Added ${returnedPerson.name}`
          )
      })
      .catch(error => {
        showNotification(error.response.data.error, 'error')
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(
          `Deleted ${name}`
        )
      })
    }
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App