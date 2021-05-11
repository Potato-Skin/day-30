import React from "react";
import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArr, setContactsArr] = React.useState(contacts.slice(0, 5));

  function addRandomContact() {
    const randomIndex = Math.floor(Math.random() * contacts.length);

    setContactsArr([contacts[randomIndex], ...contactsArr]);
  }

  function sortByName() {
    const newArr = [...contactsArr].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setContactsArr(newArr);
  }

  const sortByPops = () => {
    const newArr = [...contactsArr].sort((a, b) => b.popularity - a.popularity);

    setContactsArr(newArr);
  };

  function deleteContact(index) {
    // should be by id, but in this case we are not checking for unique people in the list

    const newArr = [...contactsArr].filter((person, idx) => idx !== index);

    setContactsArr(newArr);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPops}>Sort by pops</button>
      <table>
        <thead>
          <tr>
            <th>Pic</th>
            <th>Name</th>
            <th>Populatirty</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((person, index) => {
            // because you are inside the scope of the map, you have access to the `person` and `index` variables
            function deleteThisContact() {
              deleteContact(index);
            }

            //
            return (
              <Celeb
                {...person}
                index={index}
                key={`${person.id} - ${index}`}
                deleteContact={deleteContact}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Celeb(props) {
  return (
    <tr>
      <td>
        <img
          src={props.pictureUrl}
          alt={props.name}
          style={{ height: "150px" }}
        />
      </td>
      <td>{props.name}</td>
      <td>{props.popularity.toFixed(2)}</td>
      <td>
        {/* we need the deleteContact(props.index) */}
        <button onClick={() => props.deleteContact(props.index)}>Delete</button>
      </td>
    </tr>
  );
}

function hello() {
  console.log(1);
}

// hello; // function definition
// hello(); // invoking / calling the function

// const jello = () => console.log("Jay Ho")
// hello
// hello()
// jello
// jello()

// const log = console.log
// log

export default App;
