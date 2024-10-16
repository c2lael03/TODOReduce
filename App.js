import React, { useReducer, useState } from 'react';
import { TextInput } from 'react-native';
import { FlatList, Button, Text, View, Image } from 'react-native';

//let nextId = 0;

let initialArtists = [
  { id: 1, name: 'Artist 1' },
  { id: 2, name: 'Artist 2' },
];

const initialList = [
  { id: 3, text: 'Task 1', completed: false },
  { id: 4, text: 'Task 2', completed: true },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter((todo, index) => index !== action.index);
    default:
      throw new Error();
  }
}

export default function List() {
  //nämä on reducer-listiin
  const [todos, dispatch] = useReducer(todoReducer, []);
  //nämä oli TODOs-tehtävässä
  const [text, setText] = useState('');

  const [name, setName] = useState('');
  //const [artists, setArtists] = useState([]);
  // alla vaihtoehtoinen, jos halutaan näkyviin id-osioon tallennetut nimet
  const [artists, setArtists] = useState(initialArtists);
  const [myList, setMyList] = useState(initialList);
//  const [yourList, setYourList] = useState(initialList);
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id  !== id));
    };


    function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
    }

    //nämä funktiot alla on reduser-lististä:
    function handleAddTodo(text) {
    dispatch({ type: 'ADD_TODO', text });
    setText(''); // Tyhjennä TextInput-kenttä syötön jälkeen
  }

  function handleRemoveTodo(index) {
    dispatch({ type: 'REMOVE_TODO', index });
  }

//onClick={handleAddTodo}
//tai
/*      <button onClick={() => {
        setArtists([
          { id: nextId++, name: name },
          ...artists
        ]);
      }}>Save</button>
*/      
 
  return (
    <>
      <h1>Todo Reducer List</h1>
      <TextInput
        style={{ marginTop: 40 }}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button title="Handle Add Todo" onPress={handleAddTodo} />

      <button onClick={() => {
        setText([
          { id: nextId++, text: text },
          ...artists
        ]);
      }}>Save text</button>

      <button onClick={() => {
        setArtists([
          { id: nextId++, name: name },
          ...artists
        ]);
      }}>Save artists</button>

      <button onClick={() => {
        setName([
          { id: nextId++, text: name },
          ...artists
        ]);
      }}>Save name</button>

      <ul>
        {artists.map(artist => (
          <li 
            key={artist.id} 
            >
            {artist.name}{' '}          
          </li>
        ))}
      </ul>



    </>
  );
}


/*      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => handleRemoveTodo(index)}>
            {todo.text}
          </li>
        ))}
      </ul>
*/