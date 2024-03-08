import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, fetchTodos }) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <TodoItem key={todo.id} item={todo} fetchTodos={fetchTodos}/>
      ))}
    </ul>
  )
};

export default TodoList;
