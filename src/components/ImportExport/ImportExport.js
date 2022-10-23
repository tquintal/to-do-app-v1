import React, { useContext } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './ImportExport.module.css';
import { CSVLink } from 'react-csv';

function ImportExport() {
    const storageContext = useContext(StorageContext);

    const onDeleteAllHandler = () => {
        storageContext.onDeleteAll();
    };

    const onClickHandler = () => {
        alert('Not available yet');
    };

    return (
        <div className={classes['container']}>
            <button onClick={onDeleteAllHandler}>Remove all</button>
            <CSVLink data={storageContext.toDos}>Export</CSVLink>
            {/* <div className={classes['import-container']}>
                <label htmlFor='upload'>Import:</label>
                <input id='upload' type='file' accept='.csv' />
            </div> */}
            <button onClick={onClickHandler}>Import</button>
        </div>
    );
};

export default ImportExport;
