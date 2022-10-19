import React from 'react';
import './App.css';
import ImportExport from './components/ImportExport/ImportExport';
import NewToDo from './components/NewToDo/NewToDo';
import TodoList from './components/ToDoList/ToDoList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='main'>
      <div className='content'>
        <h1>To do app</h1>
        <NewToDo />
        <TodoList />
      </div>
      <ImportExport />
      <Footer />
    </div>
  );
};

export default App;
