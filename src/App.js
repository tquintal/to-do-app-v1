import React, { useState } from 'react';
import './App.css';
import NewToDo from './components/NewToDo/NewToDo';
import TodoList from './components/ToDoList/ToDoList';
import ImportExport from './components/ImportExport/ImportExport';
import { FiGithub } from 'react-icons/fi';

function App() {
  const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);

  const newToDoHandler = toDo => {
    setToDos(prevToDos => {
      const updatedToDos = [...prevToDos];
      updatedToDos.push({ content: toDo, id: Math.random().toString(), completed: false });
      localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
    console.log(`To do added ✅\nToDo: ${toDo}`);
  };

  const onUpdateHandler = id => {
    setToDos(prevToDos => {
      const updatedToDos = [...prevToDos].map(toDo => {
        if (toDo.id === id)
          return { ...toDo, completed: !toDo.completed };
        else return toDo;
      });
      localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
  };

  const onEditHandler = (id, toDoContent) => {
    console.log(id, toDoContent);
    setToDos(prevToDos => {
      const updatedToDos = [...prevToDos].map(toDo => {
        if (toDo.id === id) return { ...toDo, content: toDoContent };
        else return toDo;
      });
      localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
      return updatedToDos;
    });
  };

  const onDeleteHandler = id => {
    const updatedToDos = toDos.filter(todo => todo.id !== id);
    setToDos(updatedToDos);
    localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
  };

  return (
    <div className='main'>
      <div className='content'>
        <h1>To do app</h1>
        <ImportExport toDos={toDos} />
        <NewToDo onNewToDo={newToDoHandler} />
        <TodoList toDos={toDos} onUpdate={onUpdateHandler} onEdit={onEditHandler} onDelete={onDeleteHandler} />
      </div>
      <a href='https://github.com/tquintal/' target='_blank' rel='noreferrer' className='footer'><FiGithub /> tquintal</a>
    </div>
  );
};

export default App;
