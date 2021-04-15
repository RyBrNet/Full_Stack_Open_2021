import React, { useState, useEffect } from "react";
import axios from 'axios'
import DisplayPeople from "./components/DisplayPeople.js";
import Filter from "./components/Filter.js";
import NewAddition from "./components/NewAddition.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      <DisplayPeople persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
