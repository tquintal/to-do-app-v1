import React, { useEffect, useState } from 'react';

const StorageContext = React.createContext({
    toDos: [],
    categories: [],
    onAdd: () => { },
    onCategoryAdd: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onDeleteAll: () => { },
    onLoadTestToDos: () => { }
});

export const StorageContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('Categories')) || ['none']);

    // Load test values
    const loadTestToDosHandler = testToDos => {
        setToDos(() => {
            const updatedToDos = testToDos.concat();
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });

        setCategories(() => {
            const updatedCat = ['none', 'one', 'two', 'three', 'four'];
            localStorage.setItem('Categories', JSON.stringify(updatedCat));
            return updatedCat;
        });
    };

    // CLEARS TODOS ON VERSION CHANGE
    useEffect(() => {
        const appVersion = '1.0.14';
        const storageVersion = JSON.parse(localStorage.getItem('Version')) || '';
        if (storageVersion !== appVersion) {
            localStorage.removeItem('ToDos');
            localStorage.setItem('Version', JSON.stringify(appVersion));
            setToDos([]);
            localStorage.removeItem('Categories');
            setCategories(['None']);
        };
    }, []);

    // NEW TODO
    const addHandler = (toDo, category, highPriority) => {
        setToDos(prevToDos => {
            const updatedToDos = [...prevToDos];
            updatedToDos.push({ id: Math.random().toString(), content: toDo, created: new Date(), category: category, highPriority: highPriority, completed: false });
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });
    };

    // NEW CATEGORY
    const addCategoryHandler = (newCategory) => {
        setCategories(prevCat => {
            const updatedCat = [...prevCat];
            updatedCat.push(newCategory);
            localStorage.setItem('Categories', JSON.stringify(updatedCat));
            console.log(updatedCat, localStorage.getItem('Categories'));
            return updatedCat;
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

        setCategories(() => {
            const updatedCat = ['none'];
            localStorage.setItem('Categories', JSON.stringify(updatedCat));
            return updatedCat;
        })

        // setToDos([]);
        // localStorage.removeItem('ToDos');
    };

    return (
        <StorageContext.Provider
            value={{
                toDos: toDos,
                categories: categories,
                onAdd: addHandler,
                onCategoryAdd: addCategoryHandler,
                onComplete: completeHandler,
                onEdit: editHandler,
                onDelete: deleteHandler,
                onDeleteAll: deleteAllHander,
                onLoadTestToDos: loadTestToDosHandler
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContext;
