import React, { useContext } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './ImportExport.module.css';
import { CSVLink } from 'react-csv';

const ImportExport = () => {
    const storageContext = useContext(StorageContext);

    const onClickHandler = () => {
        alert('Not available yet');
    };

    return (
        <div className={classes['container']}>
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
