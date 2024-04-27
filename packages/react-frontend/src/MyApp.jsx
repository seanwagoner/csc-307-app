import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise;
    }

    function updateList(person) {
      postUser(person)
        .then(response => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw new Error('Failed to create user'); 
          }
        })
        .then(newUser => {
          setCharacters(characters => [...characters, { ...newUser, id: newUser._id }]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    function removeOneCharacter(index) {
      const user = characters[index];
      if (user && user._id) {
        fetch(`http://localhost:8000/users/${user._id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.status === 204) {
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated);
          } else if (response.status === 404) {
            console.log('User not found');
          } else {
            throw new Error('Failed to delete the user');
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    const [characters, setCharacters] = useState([]);

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
}

export default MyApp;