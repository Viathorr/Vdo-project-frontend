import React, { useState, useEffect } from 'react';
import SearchTodos from '../components/todos/SearchTodos';
import TodoList from '../components/todos/TodoList';
import { FaPlus } from "react-icons/fa6";
import AddTodo from '../components/todos/AddTodo';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from 'react-redux';
import { updateTodos } from '../features/todos/todos';
import Pagination from "../components/todos/Pagination";
 
const Todos = () => {
  const [url, setUrl] = useState('/todos');
  const { data, isLoading, fetchError } = useAxiosFetch(url);
  const [mode, setMode] = useState('light');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  // TODO Handle todos sorting, filtering and pagination
  const [filterMode, setFilterMode] = useState({ value: 'all', label: 'All' });
  const [sortingMode, setSortingMode] = useState({ value: 'name', label: 'Name' });
  const [addTodoClicked, setAddTodoClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const axiosJWT = useAxiosPrivate();
  const todos = useSelector(state => state.todos.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setNextPage(data.nextPage ? data.nextPage : null);
    setPrevPage(data.prevPage ? data.prevPage : null);
    dispatch(updateTodos(data.todos?.map(todo => {
      return { id: todo.id, name: todo.name, checked: todo.checked }
    })));
  }, [data, dispatch]);

  useEffect(() => {
    const filteredResults = todos?.filter(todo => ((todo.name).toLowerCase()).includes(searchValue.toLowerCase())) || [];
    setSearchResults(filteredResults);
  }, [todos, searchValue]);

  useEffect(() => {
    setUrl(`/todos?page=${page}&filter=6&s=${sortingMode.value}&f=${filterMode.value}`);
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      setUrl(`/todos?page=1&filter=6&s=${sortingMode.value}&f=${filterMode.value}`);
    }
  }, [sortingMode, filterMode]);

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
            sortingMode={sortingMode}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            setSortingMode={setSortingMode}
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            mode={mode} 
            setMode={setMode} 
          />
          <TodoList
            todos={
              searchResults || searchValue
                  ? searchResults
                  : todos
            }
          />
          <Pagination page={page} nextPage={nextPage} prevPage={prevPage} setPage={setPage} />
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
