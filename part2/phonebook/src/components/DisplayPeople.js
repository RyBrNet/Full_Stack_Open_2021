import React from "react";
import personsService from "../services/persons.js";

const DisplayPerson = ({
  person,
  persons,
  setPersons,
  setMessage,
  setError,
}) => {
  const deletePerson = (id) => {
    console.log("Delete button clicked");

    if (window.confirm(`Delete ${person.name}`)) {
      personsService
        .deletePerson(id)
        .then((response) => {
          console.log("promise fulfilled");
          setPersons(persons.filter((n) => n.id !== id));
          setMessage(`${person.name} deleted from the Phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(`Unable to delete '${person.name}' from the Phonebook`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  return (
    <li>
      {person.name} {person.phoneNumber}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
  );
};

const DisplayPeople = ({
  persons,
  nameFilter,
  setPersons,
  setMessage,
  setError,
}) => {
  const peopleToShow =
    nameFilter === ""
      ? persons
      : persons.filter((element) =>
          element.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

  return (
    <ul>
      {peopleToShow.map((person) => (
        <DisplayPerson
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
          setMessage={setMessage}
          setError={setError}
        />
      ))}
    </ul>
  );
};

export default DisplayPeople;
