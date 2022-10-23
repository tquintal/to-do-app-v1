import React, { useState, useContext } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './NewToDo.module.css';
import InputButton from '../UI/InputButton';

function NewToDo() {
    const [toDo, setToDo] = useState('');
    const [highPriority, setHighPriority] = useState(false);

    const storageContext = useContext(StorageContext);

    const onChangeHandler = event => {
        setToDo(event.target.value);
    };

    const onPriorityHandler = () => {
        setHighPriority(prevState => !prevState);
    };

    console.log(highPriority);

    const onSubmitHandler = event => {
        event.preventDefault();
        if (toDo.trim().length === 0) return;
        storageContext.onAdd(toDo);
        setToDo('');
    };

    return (
        <form onSubmit={onSubmitHandler} className={classes.newToDoForm}>
            <label htmlFor='todo'>Add to do:</label>
            <div className={classes.inputContainer}>
                <input
                    id='todo'
                    type='text'
                    value={toDo}
                    onChange={onChangeHandler}
                />
                <InputButton onClick={onPriorityHandler} className={`${classes['button']} ${highPriority && classes['priority-button-active']}`}>❗</InputButton>
                <InputButton type='submit' className={classes['button']}>Add</InputButton>
            </div>
        </form>
    );
};

export default NewToDo;

// {`${classes['priority-button']} ${highPriority} && ${classes['priority-button-active']}`}
// className={classes[]}