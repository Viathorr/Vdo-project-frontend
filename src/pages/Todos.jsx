import { useState, useEffect } from 'react';
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
  const { data, isLoading, fetchError, setData } = useAxiosFetch(url);
  const [mode, setMode] = useState('light');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [addTodoClicked, setAddTodoClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const todosInfo = useSelector(state => state.todos.value);
  const dispatch = useDispatch();
  const axiosJWT = useAxiosPrivate();

  useEffect(() => {
    setNextPage(data.nextPage ? data.nextPage : null);
    setPrevPage(data.prevPage ? data.prevPage : null);
    dispatch(updateTodos(data.todos?.map(todo => {
      console.log(new Date(todo.deadline));
      return { id: todo.id, name: todo.name, checked: todo.checked, deadline: todo.deadline ? new Date(todo.deadline) : null };
    })));
  }, [data, dispatch]);

  useEffect(() => {
    const filteredResults = todosInfo.todos?.filter(todo => ((todo.name).toLowerCase()).includes(searchValue.toLowerCase())) || [];
    setSearchResults(filteredResults);
  }, [todosInfo.todos, searchValue]);

  useEffect(() => {
    setUrl(`/todos?page=${page}&filter=6&s=${todosInfo.sortingMode.value}&f=${todosInfo.filterMode.value}`);
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      setUrl(`/todos?page=1&filter=6&s=${todosInfo.sortingMode.value}&f=${todosInfo.filterMode.value}`);
    }
  }, [todosInfo.sortingMode, todosInfo.filterMode]);


  const fetchTodos = async () => {
    const response = await axiosJWT.get(`/todos?page=${page}&limit=6&s=${todosInfo.sortingMode.value}&f=${todosInfo.filterMode.value}`);
    setData(response.data ? response.data : {});
  };

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
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            mode={mode} 
            setMode={setMode} 
          />
          <TodoList
            todos={
              searchResults || searchValue
                  ? searchResults
                  : todosInfo.todos
            }
            fetchTodos={fetchTodos}
          />
          <Pagination page={page} nextPage={nextPage} prevPage={prevPage} setPage={setPage} />
          <AddTodo
            addTodoClicked={addTodoClicked}
            setAddTodoClicked={setAddTodoClicked}
            fetchTodos={fetchTodos}
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
