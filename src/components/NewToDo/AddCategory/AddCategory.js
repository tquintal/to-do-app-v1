import React, { useState } from 'react';
import classes from './AddCategory.module.css';

const AddCategory = props => {
    const [newCategory, setNewCategory] = useState('');

    const onInputChangeHandler = event => {
        setNewCategory(event.target.value);
    };

    const onSubmitHandler = () => {
        props.addCategory(newCategory);
        props.showAddCategory();
    };

    return <div className={classes['add-category-container']}>
        <p>Add category:</p>
        <div className={classes['add-category-section']}>
            <input type='text' name='category-input' className={classes['add-category-input']} onChange={onInputChangeHandler} />
            <button type='submit' onClick={onSubmitHandler} className={classes['add-category-button']}>Add</button>
        </div>
    </div>
};

export default AddCategory;
