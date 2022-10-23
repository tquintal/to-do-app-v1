import React, { useContext, Fragment, useState } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './ToDoList.module.css';
// import { AiOutlineDelete } from 'react-icons/ai';

function ToDoList() {
    const storageContext = useContext(StorageContext);

    const [sortBy, setSortBy] = useState('default');

    const onSortByDefaultHandler = () => { setSortBy('default'); };

    const onSortByDateAddedHandler = () => { setSortBy('date'); };

    const onSortByPriorityHandler = () => { setSortBy('priority') };

    const getSortedToDos = () => {
        if (sortBy === 'default')
            return storageContext.toDos;

        if (sortBy === 'date') {
            const sortByDate = storageContext.toDos.concat().map(toDo => {
                return { ...toDo, created: new Date(toDo.created) } // Translate string to date
            }).sort((a, b) => b.created - a.created);

            return sortByDate;
        };

        if (sortBy === 'priority') {
            const sortByPriority = [
                ...storageContext.toDos.concat().filter(toDo => toDo.highPriority),
                ...storageContext.toDos.concat().filter(toDo => !toDo.highPriority)
            ];
            return sortByPriority;
        };
    };

    const onChangeHandler = event => {
        const id = event.target.attributes.todoid.value;
        storageContext.onComplete(id);
    };

    const onInputChangeHandler = event => {
        const id = event.target.attributes.todoid.value;
        const content = event.target.value;
        storageContext.onEdit(id, content);
    };

    const onDeleteHandler = event => {
        const id = event.target.attributes.todoid.value;
        storageContext.onDelete(id);
    };

    const HighPriority = props => {
        return props.highPriority && <p>❗</p>
    };

    const DeleteButton = props => {
        return <button onClick={onDeleteHandler} title='delete-button' todoid={props.todoid} className={classes['delete-button']}>Delete</button>;
    };

    return (
        <Fragment>
            <div className={classes['to-do-list-container']}>
                <div>
                    <p>Sort by:</p>
                    <div className={classes['sort-by-container']}>
                        <div className={classes['sort-by-item']}>
                            <input type='radio' name='radio-button' defaultChecked={true} onChange={onSortByDefaultHandler} id='default' />
                            <label htmlFor='default'>Default</label>
                        </div>
                        <div className={classes['sort-by-item']}>
                            <input type='radio' name='radio-button' onChange={onSortByDateAddedHandler} id='date' />
                            <label htmlFor='date'>Recently added</label>
                        </div>
                        <div className={classes['sort-by-item']}>
                            <input type='radio' name='radio-button' onChange={onSortByPriorityHandler} id='priority' />
                            <label htmlFor='priority'>Priority</label>
                        </div>
                    </div>
                </div>
                <ul className={classes['to-do-list-container']}>
                    {
                        storageContext.toDos.length > 0 && getSortedToDos().filter(toDo => !toDo.completed).map(toDo =>
                            <li key={toDo.id} className={classes['to-do-list-item-container']}>
                                <div className={classes['to-do-list-item-left']}>
                                    <input type='checkbox' onChange={onChangeHandler} todoid={toDo.id} checked={toDo.completed} title='checkbox' />
                                    <input type='text' title='todo' defaultValue={toDo.content} onChange={onInputChangeHandler} todoid={toDo.id} className={classes['edit-todo-input']} />
                                </div>
                                <HighPriority highPriority={toDo.highPriority} />
                                <DeleteButton todoid={toDo.id}></DeleteButton>
                            </li>
                        )
                    }
                </ul>
                {storageContext.toDos.filter(toDo => !toDo.completed).length === 0 && <p className={classes['no-tasks']}>All tasks completed</p>}
            </div>
            {
                storageContext.toDos.filter(toDo => toDo.completed).length > 0 &&
                <div>
                    <p>Completed:</p>
                    <ul className={classes['to-do-list-container']}>
                        {
                            getSortedToDos().filter(toDo => toDo.completed).map(toDo =>
                                <li key={toDo.id} className={classes['to-do-list-item-container']}>
                                    <div className={classes['to-do-list-item-left']}>
                                        <input type='checkbox' onChange={onChangeHandler} todoid={toDo.id} checked={toDo.completed} title='checkbox' />
                                        <input type='text' title='todo' defaultValue={toDo.content} onChange={onInputChangeHandler} todoid={toDo.id} className={classes['edit-todo-input']} />
                                    </div>
                                    <HighPriority highPriority={toDo.highPriority} />
                                    <DeleteButton todoid={toDo.id}></DeleteButton>
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
