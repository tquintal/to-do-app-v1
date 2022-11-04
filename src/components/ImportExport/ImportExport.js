import React, { useContext } from 'react';
import StorageContext from '../../storage/storage-context';
import classes from './ImportExport.module.css';
import { CSVLink } from 'react-csv';

function ImportExport() {
    const storageContext = useContext(StorageContext);

    const onImportHandler = event => {
        const csvToArray = (str, delimiter = ',') => {
            const headers = str.slice(0, str.indexOf('\n')).split(delimiter);

            if (headers.join('') !== 'idcontentcreatedcategoryhighPrioritycompleted') {
                alert('⚠️ Error, wrong format file.');
                return 'error';
            };

            const rows = str.slice(str.indexOf('\n') + 1).split('\n');

            const arr = rows.map(row => {
                const values = row.split(delimiter);
                const el = headers.reduce((object, header, index) => {
                    if (values[index] === 'true')
                        object[header] = true
                    else if (values[index] === 'false')
                        object[header] = false
                    else
                        object[header] = values[index];

                    return object;
                }, {});
                return el;
            });

            return arr;
        };

        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsText(event.target.files[0]);
            reader.onload = e => {
                let text = e.target.result.replace(/"/g, '');
                const convert = csvToArray(text);
                if (convert !== 'error')
                    storageContext.onLoadToDos(csvToArray(text));
            };
        };
    };

    const onDeleteAllHandler = () => {
        storageContext.onDeleteAll();
    };

    return (
        <div className={classes['import-export-container']}>
            <button onClick={onDeleteAllHandler}>Clear</button>
            <CSVLink data={storageContext.toDos}>Export</CSVLink>
            <div className={classes['import-container']}>
                <label htmlFor='upload'>Import:</label>
                <input id='upload' type='file' accept='.csv' onChange={onImportHandler} />
            </div>
        </div>
    );
};

export default ImportExport;
