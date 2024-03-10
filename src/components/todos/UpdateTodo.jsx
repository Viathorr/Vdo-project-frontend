import { useEffect, useState } from 'react';
import TodoInfo from './TodoInfo';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UpdateTodo = ({ updateTodoClicked, setUpdateTodoClicked, fetchTodos }) => {
  const [todoName, setTodoName] = useState(updateTodoClicked.todo?.name);
  const [deadline, setDeadline] = useState(updateTodoClicked.todo?.deadline); 
  const axiosJWT = useAxiosPrivate();

  useEffect(() => {
    setTodoName(updateTodoClicked.todo?.name);
    setDeadline(updateTodoClicked.todo?.deadline);
  }, [updateTodoClicked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await axiosJWT.put(`/todos?id=${updateTodoClicked.todo.id}`, { name: todoName, deadline });
    //   await fetchTodos();
    // } catch (err) {
    //   console.log(`Error: ${err.message}`);
    // }
     
    setTodoName('');
    setDeadline(null);
    setUpdateTodoClicked({ clicked: false, todo: null });
  };

  return (
    <div className={updateTodoClicked.clicked ? 'todo-window open' : 'todo-window'}>
      <div className='todo-content'>
        <h2 className='todo-info-title'>UPDATE TODO</h2>
        <TodoInfo
          todoName={todoName}
          setTodoName={setTodoName}
          deadline={deadline}
          setDeadline={setDeadline}
          handleSubmit={handleSubmit}
          setBtnClicked={setUpdateTodoClicked}
        />
      </div>
    </div>
  )
};

export default UpdateTodo;
