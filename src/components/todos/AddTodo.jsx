import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todos/todos';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddTodo = ({ addTodoClicked, setAddTodoClicked, fetchTodos }) => {
  const [todo, setTodo] = useState('');
  const [deadline, setDeadline] = useState(null); 
  const todoNameRef = useRef();
  const dispatch = useDispatch();
  const axiosJWT = useAxiosPrivate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.post('/todos', { name: todo, deadline });
      const newTodo = response.data;
      dispatch(addTodo({ ...newTodo, name: todo}));
      await fetchTodos();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
     
    setTodo('');
    todoNameRef.current.focus();
  };

  return (
    <div className={addTodoClicked ? 'add-todo-window open' : 'add-todo-window'}>
      <div className='add-todo-content'>
        <h2 className='add-todo-title'>ADD TODO</h2>
        <form className='add-todo-form'>
          <input
            className='todo-name-input'
            type="text"
            ref={todoNameRef}
            placeholder='Todo name here'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className='todo-deadline-container'>
            <ReactDatePicker
              selected={deadline}
              minDate={new Date()}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              onChange={date => setDeadline(date)}
              placeholderText='Pick a deadline'
              popperPlacement='right'
              isClearable
              shouldCloseOnSelect={false}
            />
          </div>
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
