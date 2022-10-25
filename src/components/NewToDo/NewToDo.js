import React, { useState, useContext } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './NewToDo.module.css';
import InputButton from '../UI/InputButton';
import AddCategory from './AddCategory/AddCategory';

function NewToDo() {
    const [toDo, setToDo] = useState('');
    const [category, setCategory] = useState('None');
    const [addCategoryView, setAddCategoryView] = useState(false);
    const [highPriority, setHighPriority] = useState(false);

    const storageContext = useContext(StorageContext);

    const onChangeHandler = event => {
        setToDo(event.target.value);
    };

    const onCategoryChangeHandler = event => {
        setCategory(event.target.value);
    };

    const onShowAddCategoryHandler = () => {
        setAddCategoryView(prevState => !prevState);
    };

    const onAddCategoryHandler = newCategory => {
        storageContext.onCategoryAdd(newCategory);
    };

    const onPriorityHandler = () => {
        setHighPriority(prevState => !prevState);
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        if (toDo.trim().length === 0) return;
        storageContext.onAdd(toDo, category.toLowerCase(), highPriority);
        setToDo('');
        setHighPriority(false);
    };

    return (
        <form onSubmit={onSubmitHandler} className={classes['new-to-do-container']}>
            <label htmlFor='todo'>Add to do:</label>
            <div className={classes['input-container']}>
                <input
                    id='todo'
                    type='text'
                    value={toDo}
                    onChange={onChangeHandler}
                    className={classes['new-to-do-input']}
                />
            </div>
            <select onChange={onCategoryChangeHandler}>
                {storageContext.categories.map(cat => {
                    return <option key={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>;
                })}
            </select>
            <div className={classes['options-container']}>
                <InputButton onClick={onShowAddCategoryHandler} className={classes['add-category-button']}>New category</InputButton>
                {addCategoryView && <AddCategory showAddCategory={onShowAddCategoryHandler} addCategory={onAddCategoryHandler}>Hello world 🤓</AddCategory>}
                <InputButton onClick={onPriorityHandler} className={`${classes['priority-button']} ${highPriority && classes['priority-button-active']}`}>❗</InputButton>
                <InputButton type='submit' className={classes['submit-button']}>Add to do</InputButton>
            </div>
        </form>
    );
};

export default NewToDo;
