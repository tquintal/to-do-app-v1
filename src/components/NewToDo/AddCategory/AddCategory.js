import React, { useState, useContext } from 'react';
import StorageContext from '../../../storage/storage-context';
import classes from './AddCategory.module.css';

const AddCategory = props => {
    const [newCategory, setNewCategory] = useState('');

    const storageContext = useContext(StorageContext);

    const onInputChangeHandler = event => {
        setNewCategory(event.target.value);
    };

    const onSubmitHandler = () => {
        props.addCategory(newCategory);
    };

    return <div className={classes['add-category-container']}>
        <div className={classes['add-category-content']}>
            <p>Add category:</p>
            <div className={classes['add-category-section']}>
                <input type='text' name='category-input' className={classes['add-category-input']} onChange={onInputChangeHandler} />
                <button type='submit' onClick={onSubmitHandler} className={classes['add-category-button']}>Add</button>
                <button onClick={storageContext.onShowAddCategoryView} className={classes['add-category-button']}>Close</button>
            </div>
        </div>
    </div>
};

export default AddCategory;
