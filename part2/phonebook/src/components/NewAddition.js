import React from "react";

const NewAddition = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newPhoneNumber,
  setNewPhoneNumber,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };

    const found = persons.find((element) => element.name === newName);
    if (found === undefined) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhoneNumber("");
    } else {
      window.alert(`${newName} is already added to the phonebook`);
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
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewAddition;
