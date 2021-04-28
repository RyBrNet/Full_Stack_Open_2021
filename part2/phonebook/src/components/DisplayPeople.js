import React from "react";
import personsService from "../services/persons.js";

const DisplayPerson = ({ person, persons, setPersons }) => {
  const deletePerson = (id) => {
    console.log("Delete button clicked");
    
    if(window.confirm(`Delete ${person.name}`)) {
      personsService.deletePerson(id).then((response) => {
        console.log("promise fulfilled");
        setPersons(persons.filter((n) => n.id !== id));
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

const DisplayPeople = ({ persons, nameFilter, setPersons }) => {
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
        />
      ))}
    </ul>
  );
};

export default DisplayPeople;
