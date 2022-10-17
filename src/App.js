import React from 'react';
import './App.css';
import NewToDo from './components/NewToDo/NewToDo';
import TodoList from './components/ToDoList/ToDoList';
import ImportExport from './components/ImportExport/ImportExport';
import { FiGithub } from 'react-icons/fi';

function App() {

  return (
    <div className='main'>
      <div className='content'>
        <h1>To do app</h1>
        <ImportExport />
        <NewToDo />
        <TodoList />
      </div>
      <a href='https://github.com/tquintal/' target='_blank' rel='noreferrer' className='footer'><FiGithub /> tquintal</a>
    </div>
  );
};

export default App;
