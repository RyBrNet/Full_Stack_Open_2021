import React from "react";
import personsService from "../services/persons.js";

const NewAddition = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newPhoneNumber,
  setNewPhoneNumber,
  setMessage,
  setError,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    console.log("Add button clicked", event.target);
    const personObject = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };

    const found = persons.find((element) => element.name === newName);
    if (found === undefined) {
      personsService
        .create(personObject)
        .then((response) => {
          console.log("promise fulfilled");
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhoneNumber("");
          setMessage(`${response.name} added to the Phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setError(`Unable to add '${newName}' to the Phonebook`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${found.name} is already in the phonebook, replace the old number with a  new one?`
        )
      ) {
        personsService
          .update(found.id, personObject)
          .then((response) => {
            console.log("promise fulfilled");
            setPersons(
              persons.map((person) =>
                person.id !== found.id ? person : response
              )
            );
            setNewName("");
            setNewPhoneNumber("");
            setMessage(`${response.name} phone number changed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setError(`Unable to change '${newName}' phone number`);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Phone Number:{" "}
        <input value={newPhoneNumber} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default NewAddition;
