import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <TodoItem key={todo.id} item={todo}/>
      ))}
    </ul>
  )
};

export default TodoList;
