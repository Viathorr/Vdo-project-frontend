import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, fetchTodos, setUpdateTodoClicked }) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          item={todo}
          fetchTodos={fetchTodos}
          setUpdateTodoClicked={setUpdateTodoClicked}
        />
      ))}
    </ul>
  )
};

export default TodoList;
