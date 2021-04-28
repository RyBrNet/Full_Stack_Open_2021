import React, { useState, useEffect } from "react";
import DisplayPeople from "./components/DisplayPeople.js";
import Filter from "./components/Filter.js";
import NewAddition from "./components/NewAddition.js";
import personsService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h3>New Addition</h3>
      <NewAddition
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
      />

      <h3>Numbers</h3>
      <DisplayPeople persons={persons} nameFilter={nameFilter} setPersons={setPersons} />
    </div>
  );
};

export default App;
