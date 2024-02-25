import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todos/todos';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddTodo = ({ addTodoClicked, setAddTodoClicked }) => {
  const [todo, setTodo] = useState('');
  const todoNameRef = useRef();
  const dispatch = useDispatch();
  const axiosJWT = useAxiosPrivate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.post('/todos', { name: todo });
      const newTodo = response.data;
      dispatch(addTodo({ ...newTodo, name: todo}));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
     
    setTodo('');
    todoNameRef.current.focus();
  };

  return (
    <div className={ addTodoClicked ? 'add-todo-window open' : 'add-todo-window' }>
      <div className='add-todo-content'>
        <h2 className='add-todo-title'>ADD TODO</h2>
        <form className='add-todo-form'>
          <input
            type="text"
            ref={todoNameRef}
            placeholder='Todo name here...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div>
            <button className='btn' type='button' onClick={() => setAddTodoClicked(false)}>Cancel</button>
            <button className='btn' type='submit' onClick={(e) => handleAdd(e)}>Add todo</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddTodo;
