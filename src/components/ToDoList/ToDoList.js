import React, { Fragment } from 'react';
import classes from './ToDoList.module.css';
// import { AiOutlineDelete } from 'react-icons/ai';

const ToDoList = props => {

    const onChangeHandler = event => {
        props.onUpdate(event.target.attributes.todoid.value);
    };

    const onInputChangeHandler = event => {
        props.onEdit(event.target.attributes.todoid.value, event.target.value);
    };

    const onDeleteHandler = event => {
        props.onDelete(event.target.attributes.todoid.value);
    };

    return (
        <Fragment>
            <div className={classes['to-do-list']}>
                <p>To do:</p>
                <ul>
                    {
                        props.toDos.length > 0 && props.toDos.filter(toDo => !toDo.completed).map(toDo =>
                            <li key={toDo.id}>
                                <div className={classes['to-do-list-item-left']}>
                                    <input type='checkbox' onChange={onChangeHandler} todoid={toDo.id} checked={toDo.completed} title='checkbox' />
                                    <input type='text' title='todo' defaultValue={toDo.content} onChange={onInputChangeHandler} todoid={toDo.id} className={classes['edit-todo-input']} />
                                </div>
                                <button onClick={onDeleteHandler} title='delete-button' todoid={toDo.id}>Delete</button>
                            </li>
                        )
                    }
                </ul>
                {props.toDos.filter(toDo => !toDo.completed).length === 0 && <p className={classes.noTasks}>All tasks completed</p>}
            </div>
            {
                props.toDos.filter(toDo => toDo.completed).length > 0 &&
                <div className={classes['to-do-list-completed']}>
                    <p>Completed:</p>
                    <ul>
                        {
                            props.toDos.filter(toDo => toDo.completed).map(toDo =>
                                <li key={toDo.id}>
                                    <div className={classes['to-do-list-item-left']}>
                                        <input type='checkbox' onChange={onChangeHandler} todoid={toDo.id} content={toDo.content} checked={toDo.completed} title='checkbox' />
                                        {toDo.content}
                                    </div>
                                    <button onClick={onDeleteHandler} title='delete-button' todoid={toDo.id}>Delete</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
        </Fragment>
    );
};

export default ToDoList;
