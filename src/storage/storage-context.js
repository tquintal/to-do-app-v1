import React, { useEffect, useState } from 'react';

const StorageContext = React.createContext({
    toDos: [],
    categories: [],
    addCategoryView: null,
    onAdd: () => { },
    onCategoryAdd: () => { },
    onShowAddCategoryView: () => { },
    onComplete: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onDeleteAll: () => { },
    onLoadToDos: () => { }
});

export const StorageContextProvider = props => {
    const [toDos, setToDos] = useState(JSON.parse(localStorage.getItem('ToDos')) || []);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('Categories')) || ['none']);
    const [addCategoryView, setAddCategoryView] = useState(false);

    // LOAD
    const loadToDosHandler = testToDos => {
        let updatedCategories = [];
        for (let i = 0; i < testToDos.length; i++) {
            if (!updatedCategories.find(el => el === testToDos[i].category))
                updatedCategories.push(testToDos[i].category);
        };

        setToDos(() => {
            const updatedToDos = testToDos.concat();
            localStorage.setItem('ToDos', JSON.stringify(updatedToDos));
            return updatedToDos;
        });

        setCategories(() => {
            localStorage.setItem('Categories', JSON.stringify(updatedCategories));
            return updatedCategories;
        });
    };

    // CLEARS TODOS ON VERSION CHANGE
    useEffect(() => {
        const appVersion = '1.0.15';
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
            console.log('To do added ✅');
            return updatedToDos;
        });
    };

    // SHOW CATEGORY VIEW
    const showAddCategoryView = () => {
        setAddCategoryView(prevState => !prevState);
    };

    // NEW CATEGORY
    const addCategoryHandler = newCategory => {
        if (newCategory.trim().length > 0) {
            setCategories(prevCat => {
                const updatedCat = [...prevCat];
                updatedCat.push(newCategory);
                localStorage.setItem('Categories', JSON.stringify(updatedCat));
                console.log('Category added ✅');
                return updatedCat;
            });
            showAddCategoryView();
        } else alert(`⚠️ Can't be empty ⚠️`);
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
                addCategoryView: addCategoryView,
                onAdd: addHandler,
                onCategoryAdd: addCategoryHandler,
                onShowAddCategoryView: showAddCategoryView,
                onComplete: completeHandler,
                onEdit: editHandler,
                onDelete: deleteHandler,
                onDeleteAll: deleteAllHander,
                onLoadToDos: loadToDosHandler
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContext;
