import React, { useEffect, useState } from 'react';

const StorageContext = React.createContext({
    toDos: [],
    onAdd: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { }
});

export const StorageContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);

    // CLEARS TODOS ON VERSION CHANGE
    useEffect(() => {
        const appVersion = '1.0.12';
        const storageVersion = JSON.parse(localStorage.getItem('Version')) || '';
        if (storageVersion !== appVersion) {
            localStorage.removeItem('ToDos');
            localStorage.setItem('Version', JSON.stringify(appVersion));
            setToDos([]);
        };
    }, []);

    // NEW TODO
    const addHandler = (toDo, highPriority) => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos];
            const date = new Date();
            updatedToDos.push({ id: Math.random().toString(), content: toDo, created: date, highPriority: highPriority, completed: false });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });
    };

    // COMPLETE TODO
    const completeHandler = id => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(toDo => {
                if (toDo.id === id)
                    return { ...toDo, completed: !toDo.completed };
                else return toDo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });
    };

    // EDIT TODO
    const editHandler = (id, toDoContent) => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].map(toDo => {
                if (toDo.id === id) return { ...toDo, content: toDoContent };
                else return toDo;
            });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });
    };

    // DELETE TODO
    const deleteHandler = id => {
        const updatedToDos = toDos.filter(todo => todo.id !== id);
        setToDos(updatedToDos);
        localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
    };

    return (
        <StorageContext.Provider
            value={{
                toDos: toDos,
                onAdd: addHandler,
                onComplete: completeHandler,
                onEdit: editHandler,
                onDelete: deleteHandler
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContext;
