import React, { useEffect, useState } from 'react';

const StorageContext = React.createContext({
    toDos: [],
    onAdd: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onDeleteAll: () => { }
});

export const StorageContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);

    // CLEARS TODOS ON VERSION CHANGE
    useEffect(() => {
        const appVersion = '1.0.14';
        const storageVersion = JSON.parse(localStorage.getItem('Version')) || '';
        if (storageVersion !== appVersion) {
            console.log('App cleared... 🧹');
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
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos].filter(toDo => toDo.id !== id);
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos
        });

        // Idk why but it feels better this way ^

        // const updatedToDos = toDos.filter(todo => todo.id !== id);
        // setToDos(updatedToDos);
        // localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
    };

    // DELETE ALL TODOS
    const deleteAllHander = () => {
        setToDos(() => {
            const updatedToDos = [];
            localStorage.removeItem('ToDos');
            return updatedToDos;
        });

        // setToDos([]);
        // localStorage.removeItem('ToDos');
    };

    return (
        <StorageContext.Provider
            value={{
                toDos: toDos,
                onAdd: addHandler,
                onComplete: completeHandler,
                onEdit: editHandler,
                onDelete: deleteHandler,
                onDeleteAll: deleteAllHander
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContext;
