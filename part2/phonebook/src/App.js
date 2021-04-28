import React, { useState, useEffect } from "react";
import DisplayPeople from "./components/DisplayPeople.js";
import Filter from "./components/Filter.js";
import NewAddition from "./components/NewAddition.js";
import personsService from "./services/persons.js";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  if (isError) {
    return <div className="error">{message}</div>;
  } else {
    return <div className="message">{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response);
    });
  }, []);

  return (
    <div>
      <Notification message={message} isError={false} />
      <Notification message={error} isError={true} />
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
        setMessage={setMessage}
        setError={setError}
      />

      <h3>Numbers</h3>
      <DisplayPeople
        persons={persons}
        nameFilter={nameFilter}
        setPersons={setPersons}
        setMessage={setMessage}
        setError={setError}
      />
    </div>
  );
};

export default App;
