import React, { Fragment } from 'react';
import classes from './App.module.css';
import ImportExport from './components/ImportExport/ImportExport';
import NewToDo from './components/NewToDo/NewToDo';
import TodoList from './components/ToDoList/ToDoList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Fragment>
      <main>
        <section className={classes['section-1']}>
          <NewToDo />
          <TodoList />
          <ImportExport />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
