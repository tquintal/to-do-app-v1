import React, { useState } from 'react';

const StorageContext = React.createContext({
    toDos: [],
    onAdd: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { }
});

export const StorageContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);

    // NEW TODO
    const addHandler = toDo => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos];
            updatedToDos.push({ content: toDo, id: Math.random().toString(), completed: false });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });
        console.log(`To do added ✅\nToDo: ${toDo}`);
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
