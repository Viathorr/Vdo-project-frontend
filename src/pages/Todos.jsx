import React, { useState, useEffect } from 'react';
import SearchTodos from '../components/todos/SearchTodos';
import TodoList from '../components/todos/TodoList';
import { FaPlus } from "react-icons/fa6";
import AddTodo from '../components/todos/AddTodo';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodos } from '../features/todos/todos';
 
const Todos = () => {
  const { data, isLoading, fetchError } = useAxiosFetch('/todos');
  const [mode, setMode] = useState('light');
  const [searchValue, setSearchValue] = useState('');
  const [displayMode, setDisplayMode] = useState('all');
  // TODO Handle todos sorting
  const [sortingMode, setSortingMode] = useState('date');
  const [addTodoClicked, setAddTodoClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const todos = useSelector(state => state.todos.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTodos(data.map(todo => {
      return { id: todo.id, name: todo.name, checked: todo.checked }
    })));
  }, [data, dispatch]);

  useEffect(() => {
    const filteredResults = todos.filter(todo => ((todo.name).toLowerCase()).includes(searchValue.toLowerCase()));
    setSearchResults(filteredResults);
  }, [todos, searchValue]);

  const toggleAddTodoClicked = () => {
    setAddTodoClicked(prev => !prev);
  };

  return (
    <div className='todos-container'>
      <h1 className='todo-title'>Todo list</h1>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {
        !isLoading && !fetchError && 
        <>
          <SearchTodos 
            setDisplayMode={setDisplayMode}
            setSortingMode={setSortingMode}
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            mode={mode} 
            setMode={setMode} 
          />
          <TodoList
            todos={
              searchResults || searchValue ?
                displayMode === 'active'
                ? searchResults.filter(todo => !todo.checked)
                : displayMode === 'completed'
                  ? searchResults.filter(todo => todo.checked)
                  : searchResults 
                :
                displayMode === 'active'
                ? todos.filter(todo => !todo.checked)
                : displayMode === 'completed'
                  ? todos.filter(todo => todo.checked)
                    : todos
            } />
          <AddTodo
            addTodoClicked={addTodoClicked}
            setAddTodoClicked={setAddTodoClicked}
          />
          <div className='add-btn-container'>
            <button className='add-todo-btn' onClick={() => toggleAddTodoClicked()}><FaPlus /></button>
          </div>
        </>
      }
    </div>
  )
};

export default Todos;
