import React from 'react';
import classes from './ToDoList.module.css';

const ToDoList = props => {
    const onButtonClickHandler = event => {
        props.onDelete(event.target.attributes.id.value);
    };

    return (
        <div className={classes.toDoList}>
            <p>To do:</p>
            <ul>
                {props.toDos.length > 0 ? props.toDos.map(toDo =>
                    <li key={toDo.id}>
                        {toDo.content}
                        <button onClick={onButtonClickHandler} id={toDo.id}>❌</button>
                    </li>
                ) : <p className={classes.noTasks}>No tasks yet</p>}
            </ul>
        </div>
    );
};

export default ToDoList;
