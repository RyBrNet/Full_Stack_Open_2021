import React from "react";

const DisplayPerson = ({ person }) => {
  return (
    <li>
      {person.name} {person.phoneNumber}
    </li>
  );
};

const DisplayPeople = ({ persons, nameFilter }) => {
  const peopleToShow =
    nameFilter === ""
      ? persons
      : persons.filter((element) =>
          element.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

  return (
    <ul>
      {peopleToShow.map((person) => (
        <DisplayPerson key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default DisplayPeople;
