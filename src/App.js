import React, { useState } from 'react';
import './App.css';
import NewToDo from './components/NewToDo';
import TodoList from './components/ToDoList';

function App() {
  const localToDos = JSON.parse(localStorage.getItem('ToDos')) || [];

  const [toDos, setToDos] = useState(localToDos);

  const newToDoHandler = toDo => {
    setToDos(prevToDos => {
      const updatedToDos = [...prevToDos];
      updatedToDos.push({ content: toDo, id: Math.random().toString() });
      localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
    console.log(`To do added ✅\nContent: ${toDo}`);
  };

  const onDeleteHandler = toDoId => {
    const updatedToDos = toDos.filter(todo => todo.id !== toDoId);
    setToDos(updatedToDos);
    localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
    console.log(`To do removed ✅`);
  };

  return (
    <>
      <NewToDo onNewToDo={newToDoHandler} />
      <TodoList toDos={toDos} onDelete={onDeleteHandler} />
    </>
  );
};

export default App;
